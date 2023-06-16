const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');

const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body; // 1. gething name and password!

  let accountNumber = ' ';
  // 2. generated accountNumber
  const minDigits = 6;

  while (accountNumber.length < minDigits) {
    accountNumber += Math.floor(Math.random() * 10);
  }

  const amount = 1000; // 3. const named amount

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    // 4. user  client
    name: name.toLowerCase(),
    accountNumber,
    amount,
    password: encryptedPassword,
  });

  const token = await generateJWT(user.id);

  res.status(200).json({
    // 5. response for client
    status: 'success',
    message: 'User has been created sucessfully! 👌😁',
    token,
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body; // 1. receives accountNumber and password of req.body

  const user = await User.findOne({
    //2. search user when: active, accountNumber, password.
    where: {
      accountNumber,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('User could not be found 😬', 404)); // 3. if the user does not exist send an error.
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('AccountNumber ore password Invalid 😲', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    //4 . send response for client.
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      accountnumber: user.accountNumber,
      amount: user.amount,
    },
  });
  next();
});
