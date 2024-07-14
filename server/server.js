// server.js 또는 관련 파일에 임시 사용자 정보를 추가합니다.

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // 비밀번호 암호화에 사용
const User = require('./models/User'); // 사용자 모델 (생성된 사용자 정보를 저장)

const app = express();
const port = 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/tracking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 임시 사용자 추가
const addTempUser = async () => {
  const tempUserId = 'testuser';
  const tempPassword = 'testpassword';
  const hashedPassword = await bcrypt.hash(tempPassword, 10);
  
  const user = new User({
    userId: tempUserId,
    password: hashedPassword,
  });

  await user.save();
  console.log('임시 사용자 생성 완료:', tempUserId, tempPassword);
};

addTempUser();

app.post('/auth/getToken', async (req, res) => {
  const { USER_ID, USER_PW } = req.body;
  const user = await User.findOne({ userId: USER_ID });

  if (user && await bcrypt.compare(USER_PW, user.password)) {
    const token = 'dummy-token'; // 실제 토큰 생성 로직 필요
    res.send({ token });
  } else {
    res.status(401).send({ error: 'Invalid UserId or Password' });
  }
});

app.post('/webCommon/getLoginInfo', async (req, res) => {
  const user = await User.findOne({ userId: 'testuser' }); // 임시 사용자 정보
  res.send([{
    id: user._id,
    userId: user.userId,
    name: 'Test User',
    role: 'Tester',
  }]);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
