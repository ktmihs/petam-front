// joo-ju

import '../style.css';
import React, { Component, useState, useEffect } from 'react';
import '../Components/rating/rating.css';
import { FaStar } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import Content from '../Components/Content';
import '../Components/Content.css';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };


const WritePostPage = ({ postTitle, postContent, match }) => {
  // user 정보 조회
  const reserveId = match.params._id;
  const { user, hospital } = useSelector(({ user, hospital }) => ({
    user: user.user,
    hospital: hospital.hospital,
  }));
  const location = useHistory();

  const [reservation, setReservation] = useState({
    _id: '',
    hostId: '',
    hospitalName: '',
    pet: '',
    type: '',
    dateDay: '',
    postCheck: false,
  });
  let hospitalId;
  
  const [hospitalData, setHospitalData] = useState([
    {
      _id: hospitalId,
      score: '',
      count: '',
    },
  ]);
  let reservationHospitalName;
  let reservationDateDay;

  let countstar = 0;
  let totalscore = 0;
  // 먼저 병원 정보 조회
  useEffect(async () => {
    try {

      const resReservation = axios
        .get('/api/reservations/read/' + match.params._id)
        .then((response) => {     
          setReservation({
            _id: response.data._id,
            hostId: response.data.hostId,
            hospitalName: response.data.hospitalName,
            pet: response.data.pet,
            type: response.data.type,
            dateDay: response.data.dateDay,
          });

          reservationDateDay = response.data.dateDay;
          reservationHospitalName = response.data.hospitalName;
        });

      const res = axios
        .get('/api/hospitals/read/name/' + reservation.hospitalName)
        .then((response) => {
          setHospitalData({
            _id: response.data._id,
            score: response.data.score,
            count: response.data.count,
          });
        });
      
    totalscore = hospitalData.score
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  // 별점을 계산
  // 가장 마지막 clicked[5]는 true가 총 몇개인지 나타내는 변수
  // clicked[5]가 최종적으로 저장되는 값.
  const [clicked, setClicked] = useState([
    false,
    false,
    false,
    false,
    false,
    0,
  ]);

  const handleStarClick = (e, index) => {
    e.preventDefault();
    let clickStates = [...clicked];
    clickStates[5] = 0;
    for (let i = 0; i < 5; i++) {
      if (i <= index) {
        clickStates[i] = true;
        clickStates[5] += 1;
      } else clickStates[i] = false;
    }

    setClicked(clickStates);

    totalscore = totalscore + clickStates[5]

    const res_ = axios
      .get('/api/hospitals/read/name/' + reservation.hospitalName)
      .then((response) => {
        totalscore = totalscore + response.data.score
        countstar = response.data.count + 1
        hospitalId = response.data._id;
             setHospitalData({
               _id: hospitalId,
               score: totalscore, 
               count: countstar
             });
      });
  
  };

  const postWrite = () => {
    const title = postTitle.value;
    const content = postContent.value;

    location.push('/');

    if (title === '' || title === undefined) {
      alert('제목을 입력해주세요.');
      postTitle.focus();
      return;
    } else if (content === '' || content === undefined) {
      alert('내용을 입력해주세요.');
      postContent.focus();
      return;
    } else if (clicked[5] == 0) {
      alert('평점을 입력해주세요.');
      return;
    }

    const resPostCHeck = axios.put(
      '/api/reservations/postCheck/' + reservation._id,
    );

    const send_param = {
      content: postContent.value,
      title: postTitle.value,
      score: clicked[5],
      view: 0,
      writer: user.username,
      hospitalName: reservation.hospitalName,
      reservation: reserveId,
    };

    const res2 = axios.put('/api/hospitals/' + hospitalData._id, hospitalData);

    // 게시글 저장
    axios
      .post('/api/posts/', send_param)
      .then((response) => {
        console.log('save post', response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const scope = {
    minHeight: '70px',
    paddingTop: '10px',
  };
  const h25 = {
    minHeight: '25vh',
  };

  return (
    <Content class=" " style={scope}>
      <h2 className="name">글 쓰기</h2>

      <div className="col-12 m-auto bg-white">
        <div className="col-12 m-auto pt-3">
          <Form
            class="user"
            id="WritePostPage"
          >
            <div class="form-group ">
              <p>
                예약 정보 : {reservation.hospitalName} - {reservation.dateDay}
              </p>
              <p>
                {reservationHospitalName} {reservationDateDay}
              </p>
              <div class="col-sm-12  mb-s3 msb-sm-0">       
                <input
                  type="text"
                  class="form-control mb- w-100   form-control-lg"
                  ref={(ref) => (postTitle = ref)}
                  maxLength="50"
                  value={postTitle}
                  placeholder="제목"
                />
              </div>
            </div>

            <div class="form-group  ">
              <div class="col-sm-12  mb-5  mb-sm-0">
                <textarea
                  type="textarea"
                  class="form-control mb-1 w-100  h-100 form-control-lg"
                  style={h25}
                  placeholder="내용"
                  ref={(ref) => (postContent = ref)}
                  value={postContent}
                />
              </div>
              <div className="rating">
                별점
                <div class="stars">
                  <FaStar
                    size="30"
                    onClick={(e) => handleStarClick(e, 0)}
                    className={clicked[0] ? 'clickedstar' : null}
                  />
                  <FaStar
                    size="30"
                    onClick={(e) => handleStarClick(e, 1)}
                    className={clicked[1] ? 'clickedstar' : null}
                  />
                  <FaStar
                    size="30"
                    onClick={(e) => handleStarClick(e, 2)}
                    className={clicked[2] ? 'clickedstar' : null}
                  />
                  <FaStar
                    size="30"
                    onClick={(e) => handleStarClick(e, 3)}
                    className={clicked[3] ? 'clickedstar' : null}
                  />
                  <FaStar
                    size="30"
                    onClick={(e) => handleStarClick(e, 4)}
                    className={clicked[4] ? 'clickedstar' : null}
                  />
                </div>
              </div>
              <div class="form-group mt-3" style={scope}>
                <div class="col-sm-3 float-left">
                  <Button
                    class=" btn w-100  btn-success "
                    onClick={postWrite}
                    // onChange
                    variant="success"
                    type="submit"
                    block
                  >
                    저장
                  </Button>
                </div>

                <div class="col-sm-3 float-right">
                  <Button
                    class=" btn w-100  btn-success "
                    variant="danger"
                    block
                  >
                    취소
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Content>
  );
};
export default WritePostPage;
