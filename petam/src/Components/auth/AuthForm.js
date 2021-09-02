import React, {useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import '../../style.css';

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
   
    margin-bottom: 1rem;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border: 1px solid ${palette.gray[5]};
  // padding-bottom: 0.5rem;
  // padding: 0.7rem;
  padding: 13px 20px;
  outline: none;
  border-radius: 20px;
  // border-radius: 0.5rem;
  width: 100%;
  margin-top: 0.5rem;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }

`;
const StyledInput50_ = styled.input`
  font-size: 1rem;
  border: none;
  border: 1px solid ${palette.gray[5]};
  // padding-bottom: 0.5rem;
  // padding: 0.7rem;
  padding: 13px 20px;
  outline: none;
  // width: 
  border-radius: 20px;
  // border-radius: 0.5rem;
  width: 40%;
  margin-top: 0.5rem;
  // margin-bottom: 1rem;
  float: right;
  // margin-right: 10%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }

`;
const StyledInput50 = styled.input`
  font-size: 1rem;
  border: none;
  border: 1px solid ${palette.gray[5]};
  // padding-bottom: 0.5rem;
  // padding: 0.7rem;
  padding: 13px 20px;
  outline: none;
  // width:
  border-radius: 20px;
  // border-radius: 0.5rem;
  width: 40%;
  align: right;
  margin-right: 10%;
  margin-top: 0.5rem;
  // margin-bottom: 1rem;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
`;
// 시간 선택 
const startTime = {
  border: '1px solid #adb5bd',
  padding: '13px 20px',
  // marginTop: '0.5rem',
  borderRadius: '20px',
  color: 'gray',
  // width: '80px',
  width: '20%',
  textAlign: 'center',
  float: 'left',

  // borderColor: ${palette.gray[7]},
};

const endTime = {
  border: '1px solid #adb5bd',
  padding: '13px 20px',
  color: 'gray',
  // marginTop: '0.5rem',
  borderRadius: '20px',
  width: '20%',
  float: 'right',

  // borderColor: ${palette.gray[7]},
};
const Time = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  // border: 1px solid orange;
  float: left;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height:45px;

`;
const StartTimeText = styled.div`
  //  height: 100%;
  font-size: x-large;
  // color: 
  float: left;
  margin: auto;
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 3px;
  // border: 1px solid red;
  // padding: 6px 5px 4px 5px;
`;
const EndTimeText = styled.div`
  //  height: 100%;
  font-size: x-large;
  float: right;
  margin: auto;
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 3px;
  // border: 1px solid red;
  // padding: 6px 5px 4px 5px;
`;
const Text = styled.div`
  //  height: 100%;
  font-size: x-large;
  float: left;
  margin: auto;
  text-align: center;
  // border: 1px solid green;
  padding: 6px 5px 4px 5px;
`;

// label
const Label = styled.div`
  // border: 1px solid red;
  // // border: 1px solid ${palette.gray[7]};
  // color: ${palette.gray[5]};
  text-align: left;
  padding-left: 0.3rem;
  font-size: 0.875rem;
  margin-top: 1.5rem;
`;
/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  login: '로그인',
  register: '개인 회원가입',
  hregister: '병원 회원가입',
  hlogin: '병원 로그인'
};

/**
 * 에러를 보여줍니다
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;
const title = {
  textAlign: 'center',
  marginBottom:'2rem',
};

const link = {
  marginRight: '1.5rem',
}

    // const {
    //   openHour,
    //   openMinute,
    //   closeHour,
    //   closeMinute,
    //   lunchOpenHour,
    //   lunchOpenMinute,
    //   lunchCloseHour,
    //   lunchCloseMinute,
    // } = timeList;
const AuthForm = ({ type, form, onChange, onSubmit, timeHandleChange, error }) => {

     const [time, setTime] = useState({
       hour: [
         6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
       ],
       minute: [0, 30],
     });
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3 className="mt-lg-2" style={title}>
        {text}
      </h3>
      <form onSubmit={onSubmit}>
        {type === 'hlogin' && (
          <>
            <StyledInput
              autoComplete="username"
              name="company_number"
              placeholder="사업자 번호"
              onChange={onChange}
              value={form.company_number}
            />
            <StyledInput
              autoComplete="new-password"
              name="password"
              placeholder="비밀번호"
              type="password"
              onChange={onChange}
              value={form.password}
            />
          </>
        )}
        {type === 'login' && (
          <>
            <StyledInput
              autoComplete="username"
              name="username"
              placeholder="아이디"
              onChange={onChange}
              value={form.username}
            />
            <StyledInput
              autoComplete="new-password"
              name="password"
              placeholder="비밀번호"
              type="password"
              onChange={onChange}
              value={form.password}
            />
          </>
        )}
        {type === 'register' && (
          <>
            <StyledInput
              autoComplete="username"
              name="username"
              placeholder="아이디"
              onChange={onChange}
              value={form.username}
            />
            <StyledInput
              autoComplete="new-password"
              name="password"
              placeholder="비밀번호"
              type="password"
              onChange={onChange}
              value={form.password}
            />
          </>
        )}
        {type === 'hregister' && (
          <>
            <Label>병원 이름</Label>
            <StyledInput
              autoComplete="name"
              name="name"
              placeholder="병원 이름"
              onChange={onChange}
              value={form.name}
            />
            <Label>사업자 번호</Label>
            <StyledInput
              name="company_number"
              placeholder="사업자 번호"
              onChange={onChange}
              value={form.company_number}
            />
            <Label>병원 아이디</Label>
            <StyledInput
              autoComplete="username"
              name="username"
              placeholder="영문, 숫자 가능 / 3~20자리"
              onChange={onChange}
              value={form.username}
            />
            <Label>비밀번호</Label>
            <StyledInput
              autoComplete="new-password"
              name="password"
              placeholder="비밀번호"
              type="password"
              onChange={onChange}
              value={form.password}
            />
            <StyledInput
              autoComplete="new-password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              onChange={onChange}
              value={form.passwordConfirm}
            />
            <Label>전화번호</Label>
            <StyledInput
              name="tel"
              placeholder="000-0000-0000"
              onChange={onChange}
              value={form.tel}
            />
            <Label>운영시간</Label>
            <Time>
              <select
                name="openHour"
                value={form.openHour}
                onChange={onChange}
                style={startTime}
              >
                {time.hour.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
                <option value="1" hidden>
                  open hour
                </option>
              </select>
              <StartTimeText>:</StartTimeText>
              <select
                name="openMinute"
                value={form.openMinute}
                onChange={onChange}
                style={startTime}
              >
                {time.minute.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
                <option value="1" hidden>
                  {' '}
                  open minute{' '}
                </option>
              </select>
              ~{/* <Text>~</Text> */}
              <select
                name="closeMinute"
                value={form.closeMinute}
                onChange={onChange}
                style={endTime}
              >
                {time.minute.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
                <option value="1" hidden>
                  {' '}
                  close minute{' '}
                </option>
              </select>
              <EndTimeText>:</EndTimeText>
              <select
                name="closeHour"
                value={form.closeHour}
                onChange={onChange}
                style={endTime}
              >
                {time.hour.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
                <option value="1" hidden>
                  {' '}
                  close hour{' '}
                </option>
              </select>
              {/* <TimeText>:</TimeText> */}
              {/* <p>:</p> */}
            </Time>

            <Label>점심시간</Label>

            <Time>
              <select
                name="lunchOpenHour"
                value={form.lunchOpenHour}
                onChange={onChange}
                style={startTime}
              >
                {time.hour.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
                <option value="1" hidden>
                  {' '}
                  lunch open hour{' '}
                </option>
              </select>
              <StartTimeText>:</StartTimeText>
              <select
                name="lunchOpenMinute"
                value={form.lunchOpenMinute}
                onChange={onChange}
                style={startTime}
              >
                {time.minute.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
                <option value="1" hidden>
                  {' '}
                  lunch open minute{' '}
                </option>
              </select>
              ~
              <select
                name="lunchCloseMinute"
                value={form.lunchCloseMinute}
                onChange={onChange}
                style={endTime}
              >
                {time.minute.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
                <option value="1" hidden>
                  {' '}
                  lunch close minute{' '}
                </option>
              </select>
              <EndTimeText>:</EndTimeText>
              <select
                name="lunchCloseHour"
                value={form.lunchCloseHour}
                onChange={onChange}
                style={endTime}
              >
                {time.hour.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
                <option value="1" hidden>
                  {' '}
                  lunch close hour{' '}
                </option>
              </select>
            </Time>
            <Label>지번 주소</Label>
            <StyledInput
              name="oldAddr"
              placeholder="지번 주소"
              onChange={onChange}
              value={form.oldAddr}
            />
            <Label>도로명 주소</Label>
            <StyledInput
              name="newAddr"
              placeholder="도로명 주소"
              onChange={onChange}
              value={form.newAddr}
            />
            <Label>우편 번호</Label>
            <StyledInput
              name="zipCode"
              placeholder="우편번호"
              onChange={onChange}
              value={form.zipCode}
            />
          </>
        )}

        {type === 'register' && (
          <>
            <StyledInput
              autoComplete="new-password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              onChange={onChange}
              value={form.passwordConfirm}
            />
            <StyledInput
              autoComplete="name"
              name="name"
              placeholder="이름"
              onChange={onChange}
              value={form.name}
            />
            <StyledInput
              autoComplete="email"
              name="email"
              placeholder="이메일"
              onChange={onChange}
              value={form.email}
            />
            <StyledInput
              // autoComplete="phone"
              name="phone"
              placeholder="전화번호"
              onChange={onChange}
              value={form.phone}
            />
          </>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '3rem' }}>
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' && (
          <>
            <Link to="/register" style={link}>
              개인 회원가입
            </Link>

            <Link to="/hregister" style={link}>
              병원 회원가입
            </Link>

            <Link to="/hlogin">병원 로그인</Link>
          </>
        )}
        {type === 'hlogin' && (
          <>
            <Link to="/register" style={link}>
              개인 회원가입
            </Link>
            <Link to="/hregister" style={link}>
              병원 회원가입
            </Link>

            <Link to="/login">개인 로그인</Link>
          </>
        )}
        {type === 'register' && (
          <>
            <Link to="/hregister" style={link}>
              병원 회원가입
            </Link>
            <Link to="/login" style={link}>
              개인 로그인
            </Link>

            <Link to="/hlogin">병원 로그인</Link>
          </>
        )}
        {type === 'hregister' && (
          <>
            <Link to="/register" style={link}>
              개인 회원가입
            </Link>
            <Link to="/login" style={link}>
              개인 로그인
            </Link>

            <Link to="/hlogin">병원 로그인</Link>
          </>
        )}
        {/* {type === 'login' ? (
          <>
            <Link to="/register" style={link}>
              개인 회원가입
            </Link>

            <Link to="/hregister">병원 회원가입</Link>

            <Link to="/hlogin">병원 로그인</Link>
          </>
        ) : (
          <>
            <Link to="/login">개인 로그인</Link>
            <Link to="/register" style={link}>
              개인 회원가입
            </Link>


            <Link to="/hlogin">병원 로그인</Link>
          </>
        )} */}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
