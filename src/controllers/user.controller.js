const { format } = require("util");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
const { Storage } = require("@google-cloud/storage");

const User = require("../modules/user.model");

const storage = new Storage({
  projectId: process.env.GCLOUD_STORAGE_PROJECT_ID,
  credentials: {
    private_key: process.env.GCLOUD_STORAGE_PRIVATE_KEY,
    client_id: process.env.GCLOUD_STORAGE_CLIENT_ID,
    client_email: process.env.GCLOUD_STORAGE_CLIENT_EMAIL,
  },
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

exports.create = async (req, res) => {
  const existingUser = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (existingUser) {
    return res.status(409).send({ message: "Tài khoản hoặc email đã tồn tại" });
  }
  var password = req.body.password;
  password = CryptoJS.AES.decrypt(password, process.env.secretKey);
  password = password.toString(CryptoJS.enc.Utf8);
  const passwordHash = CryptoJS.SHA256(password).toString();
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    password: passwordHash,
    email: req.body.email,
    phone: req.body.phone,
    classNumber: req.body.classNumber,
  });
  await user.save().then((data) => {
    return res.status(200).send({
      success: "true",
    });
  });
};

exports.login = async (req, res) => {
  const username = req.body.username;
  var password = req.body.password;

  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(400).send({
      message: "Bạn đã nhập sai tài khoản hoặc mật khẩu",
    });
  }
  password = CryptoJS.AES.decrypt(password, process.env.secretKey);
  password = password.toString(CryptoJS.enc.Utf8);
  password = CryptoJS.SHA256(password).toString();
  if (password != user.password) {
    return res.status(400).send({
      message: "Bạn đã nhập sai tài khoản hoặc mật khẩu",
    });
  } else {
    const token = jwt.sign({ userId: user._id }, process.env.jwtSecret, {
      expiresIn: 86400,
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 86400 });
    let data = {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      sex: user.sex,
      classNumber: user.classNumber,
      birthday: user.birthday,
      school: user.school,
      token: token,
    };
    res.status(200).send(data);
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).send({
    success: "true",
  });
};

exports.updateInformation = (req, res) => {
  const userId = req.body.id;
  const name = req.body.name;
  const birthday = req.body.birthday;
  const school = req.body.school;
  const sex = req.body.sex;
  const email = req.body.email;
  const phone = req.body.phone;
  const classNumber = req.body.classNumber;
  User.findByIdAndUpdate(
    userId,
    {
      name: name,
      birthday: birthday,
      school: school,
      sex: sex,
      email: email,
      phone: phone,
      classNumber: classNumber,
    },
    { new: true }
  )
    .then((user) => {
      let data = {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        sex: user.sex,
        classNumber: user.classNumber,
        birthday: user.birthday,
        school: user.school,
      };
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};

exports.getUserFromToken = async (req, res) => {
  token = req.body.token;
  jwt.verify(token, process.env.jwtSecret, async (err, decoded) => {
    if (err) {
      console.error(err);
    } else {
      const userId = decoded.userId;
      try {
        const user = await User.findById(userId);
        let data = {
          id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          sex: user.sex,
          classNumber: user.classNumber,
          birthday: user.birthday,
          school: user.school,
        };

        res.status(200).send(data);
      } catch (err) {
        res.status(500).send({
          message: err.message || "Some error occurred",
        });
      }
    }
  });
};

exports.changePassword = async (req, res) => {
  const userId = req.body.userId;
  var currentPassword = req.body.currentPassword;
  var newPassword = req.body.newPassword;

  const user = await User.findById(userId);
  currentPassword = CryptoJS.AES.decrypt(
    currentPassword,
    process.env.secretKey
  );
  currentPassword = currentPassword.toString(CryptoJS.enc.Utf8);
  currentPassword = CryptoJS.SHA256(currentPassword).toString();
  if (currentPassword != user.password) {
    return res.status(400).send({
      message: "Bạn đã nhập sai mật khẩu hiện tại",
    });
  } else {
    newPassword = CryptoJS.AES.decrypt(newPassword, process.env.secretKey);
    newPassword = newPassword.toString(CryptoJS.enc.Utf8);
    newPassword = CryptoJS.SHA256(newPassword).toString();
    user.password = newPassword;
    await user.save().then((data) => {
      return res.status(200).send({
        success: "true",
      });
    });
  }
};
exports.changeAvatar = async (req, res, next) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }
  userId = req.body.userId;
  // Create a new blob in the bucket and upload the file data.

  const blob = bucket.file(
    process.env.GCLOUD_STORAGE_BASE_FOLDER + req.file.originalname
  );
  const blobStream = blob.createWriteStream();
  blobStream.on("error", (err) => {
    next(err);
  });
  blobStream.on("finish", async () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.cloud.google.com/${bucket.name}/${blob.name}`
    );

    const user = await User.findById(userId);
    user.avatar = publicUrl;
    await user.save().then((user) => {
      let data = {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        sex: user.sex,
        classNumber: user.classNumber,
        birthday: user.birthday,
        school: user.school,
      };

      res.status(200).send(data);
    });
  });
  blobStream.end(req.file.buffer);
};
