import React from 'react'
import axios from 'axios'

// 반려동물 정보를 보여주는 모달창
const PetInfo = ( props ) => {
    const { open, close, header, item } = props    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴

    const handleSubmit=()=>{
        axios.delete('/api/auth/pet/'+item.parent+'/'+`${item.name}(${item.species})`)    // 보호자의 반려동물 리스트에서 해당 반려동물 삭제
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        axios.delete('/api/pets/'+item.parent+'/'+item.name)        // 동물 테이블에서 해당 반려동물 정보 삭제
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        close               // 삭제 후, 모달창 닫기
    }

    const deletePet=()=>{   // 삭제 버튼 클릭 시, 팝업 창
        swal({
            text:`등록된 ${item.name} 정보를 삭제하시겠습니까?`,
            icon: "warning",
            buttons: ['cancel',true],
            dangerMode: true,
            closeOnClickOutside:false,
            confirm:{
                text:'확인',
                value:true
            }
        })
        .then((willDelete)=>{
            if(willDelete) handleSubmit()
        })
    }

    return (
        // 모달이 열릴때 openModal 클래스가 생성
        <div className={ open ? 'openModal modal' : 'modal' }>
            { 
            open ? 
            (  
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        <h6>이름 : {item.name}<br/></h6>
                        <h6>종 : {item.species}<br/></h6>
                        <h6>성별 : {item.gender}<br/></h6>
                        <h6>생년월일 : {item.age}<br/></h6>

                    </main>
                    <footer>
                        <button className="close" onClick={deletePet}> 삭제 </button>
                    </footer>
                </section>
            ) 
            : 
            null 
            }
        </div>
    )
}
export default PetInfo