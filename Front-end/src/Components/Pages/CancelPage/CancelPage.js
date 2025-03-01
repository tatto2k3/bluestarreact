import { memo } from 'react';
import React, { useState } from 'react';
import './CancelPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const CancelPage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [secondModalVisible, setSecondModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const openSecondModal = () => {
        setModalVisible(false);
        setSecondModalVisible(true);
    }

    const closeSecondModal = () => {
        setSecondModalVisible(false);
    }

    return (
      
            <div className="container2">
        <div className="text-insertCancel">
            <h1>HỦY CHUYẾN BAY</h1>
        </div>
         
                   
                    <div className="grey-section">
                        <div className="inforCancel">
                            <div className="form-signinCancel">
                                <div className="mb-3 row text-xl-center">
                                    <label htmlFor="inputFullname" className="col-sm-2 col-form-label">Fullname</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-controlCancel" id="inputFullname" placeholder="" />
                                    </div>
                                </div>
                                <div className="mb-3 row text-xl-center">
                                    <label htmlFor="inputDob" className="col-sm-2 col-form-label">Date of birth</label>
                                    <div className="col-sm-10">
                                        <input type="date" className="form-controlCancel" id="inputDob" placeholder="" />
                                    </div>
                                </div>
                                <div className="mb-3 row text-xl-center">
                                    <label htmlFor="inputTicketCode" className="col-sm-2 col-form-label">Ticket Code</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-controlCancel" id="inputTicketCode" />
                                    </div>
                                </div>
                                <div className="row text-xl-center">
                                    <div className="col-sm-6">
                                        <button className="btn searchCancel" id="btnSearchCancel" onClick={openModal}>Tìm kiếm</button>
                                    </div>
                                </div>

                                {modalVisible && (
                                    <>
                                        <div className="modal-first" id="myModal" >
                                            <div className="modal-content">
                                                <span className="close" onClick={closeModal}>&times;</span>
                                                <div className="modal-content-inner" id="myDiv">
                                                    <b>BẠN THUỘC VÉ HẠN THƯỜNG, BẠN SẼ KHÔNG ĐƯỢC HOÀN TIỀN KHI HỦY</b>
                                                </div>
                                                <div className="cancel-return">
                                                    <div className="return-button">
                                                        <button className="return" id="return-first" onClick={closeModal}>TRỞ LẠI</button>
                                                    </div>
                                                    <div className="cancel-button">
                                                        <button className="btn-danger cancel" id="cancel-first" onClick={openSecondModal}>HỦY</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                )}

                                {secondModalVisible && (
                                    <>
                                        <div className="modal-cancel-continue" id="myModal-cancel-continue">
                                            <div className="modal-content-cancel-continue">
                                                <span className="close" onClick={closeSecondModal}>&times;</span>
                                                <div className="modal-content-inner">
                                                    <b>XÁC NHẬN HỦY?</b>
                                                </div>
                                                <div className="cancel-return">
                                                    <div className="return-button">
                                                        <button className="return" id="return-second" onClick={closeSecondModal}>TRỞ LẠI</button>
                                                    </div>
                                                    <div className="cancel-button">
                                                        <button className="btn-danger cancel" id="cancel-second" onClick={closeSecondModal}>HỦY</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            
    
    );
};

export default memo(CancelPage);
