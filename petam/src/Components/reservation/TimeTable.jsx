import React,{useState,useEffect} from 'react'
import DatePicker from "react-datepicker"
import { ko } from "date-fns/esm/locale"
import "react-datepicker/dist/react-datepicker.css"
import { addDays } from 'date-fns'
import swal from 'sweetalert'
import axios from 'axios'
import TimeList from './TimeList'
import './reservation.css'

function TimeTable(props){
    
  const [startDate, setStartDate] = useState(new Date())    // DatePicker에서 선택된 날짜 저장(시간 정보 x)
  const [startTime, setStartTime]= useState()               // TimeList에서 선택된 시간 저장(string 형식)

  const {hsp}=props   // 이전 페이지에서 병원 정보 가져오기(id, name)
  const [allReservationTime,setAllReservationTime]=useState([])   // 모든 예약된 시간 정보
  const [reservationTime,setReservationTime]=useState([])         // 현재 선택된 날짜의 시간 정보

  const [time,setTime]=useState([])             // TimeList에 보낼 해당 병원 운영 시간 list
  
  // 해당 병원 운영 시간을 time에 array로 저장
  const timeToList=(t)=>{
    let time=[]
    const {openHour,openMinute,closeHour,closeMinute,lunchOpenHour,lunchOpenMinute,lunchCloseHour,lunchCloseMinute}=t

    for(let i=Number(openHour);i<Number(closeHour);i++){
      if(i==Number(openHour) && Number(openMinute)==30){
        time.push(`${i}:30`)
      } else if(i==Number(lunchOpenHour)){
          if(Number(lunchOpenMinute)==30){
            time.push(`${i}:00`)
          }
      } else if(i==Number(lunchCloseHour)){
          if(Number(lunchCloseMinute)==30){ 
            time.push(`${i}:30`)
          } else{
            time.push(`${i}:00`)
            time.push(`${i}:30`)
          }
      } else {
        time.push(`${i}:00`)
        time.push(`${i}:30`)
      }
    }
    if(Number(closeMinute)==30) time.push(`${closeHour}:00`)

  return time
  }

  // 현재 시각에서 지난 시간들은 제외 시키기
  const currentDate = new Date()
  let minute=currentDate.getMinutes()
  let hour=currentDate.getHours()
  let date=currentDate.getDate()

  // 예약 시간 기준 30분 이전에는 예약할 수 없도록 조정
  if(minute>30){
    minute-=30
    hour+=1
  } else {minute+=30}

  const [lastTime,setLastTime]=useState({
    hour:hour,
    minute:minute,
    date:date,
    present:true    // 예약 날짜가 오늘인지 boolean으로 체크
  })

  // 병원 운영 시간 받아오기
  useEffect(() => {
    axios.get('/api/hospitals/readone/'+hsp.Id)
      .then(ctx=>{
        if(ctx.data.reservationTime)    // 여는 시간, 닫는 시간, 점심 시간이 담겨있음
        setAllReservationTime(ctx.data.reservationTime)
        if(ctx.data.timeList)
        setTime(timeToList(ctx.data.timeList))
      })
  }, [])

  // 예약할 날짜 선택 시,
  const handleClick=(date)=>{
    setStartDate(date)    // 선택된 날짜 startDate에 저장
    setReservationTime(   // 현재 선택된 날짜에 맞춰 이미 예약된 날짜들 중, 현재 날짜에 해당되는 시간만 걸러줌
      allReservationTime.filter(item=>item.split('.')[0]==date.getMonth()+1 && item.split('.')[1]==date.getDate())
    )
    if(date.getDate()==lastTime.date) setLastTime({...lastTime, present:true})  // 예약한 날짜가 오늘인 경우, 
    else setLastTime({...lastTime, present:false})          // 아닐 경우
  }

  const selectDate=()=>{    // 날짜와 시간 모두 선택 후, 다음으로 넘어가는 버튼 생성하는 click event
    {
      startTime?    // 시간을 선택했을 경우에만 다음으로 넘어갈 수 있도록 설정
      checking()
      :
      swal('','시간을 선택해주세요','warning')    // 시간을 선택하지 않았을 때, 경고 알림
      }
  }

  const checking=()=>{
    props.getTime(startDate,startTime)    // 이전 페이지(ReservationPage)에 예약된 날짜와 시간 정보 넘겨줌
    swal('',`${startDate.getMonth()+1}월 ${startDate.getDate()}일 ${startTime}을 선택하셨습니다`, 'success')  // 확인 알림창
  }

  const info={
    fontSize:'11px',
    marginBottom:'7px'
  }
  const button={
    marginBottom:'25px',
    width:'200px',
    backgroundColor:'rgb(255,170,170)'
  }
  const picker={
    width:'100%',
    height:'100%'
  }
  const datePicker={
    display:'inline-block',
    width:'300px',
    height:'250px',
    margin:'0 10px',
  }
  const timePicker={
    display:'inline-block',
    width:'400px',
    height:'250px',
    padding:'50px 0',
    margin:'0 10px',

  }
  
  return(
      <>
        <div className='content' style={picker}>
          <div style={datePicker}>
            <DatePicker
              inline
              locale={ko}
              selected={startDate}
              onChange={handleClick}
              minDate={new Date()}
              maxDate={addDays(new Date(), 30)}
            />
          </div>
          <div style={timePicker}>
            <TimeList lastTime={lastTime} timeList={time} reservationTime={reservationTime} selectTime={setStartTime}/>
          </div>
        </div>
        <div style={info}>※ 예약은 최소 30분 전까지 가능합니다<br/>회색 칸은 이미 예약된 시간이거나, 불가능한 시간입니다. ※</div>
        <button style={button} className='button' onClick={selectDate}>날짜 선택</button>
      </>
  )
}

export default TimeTable