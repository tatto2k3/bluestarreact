import React from 'react';
import "./Refund.css";

const Refund = () => {
    return (
        <div className="containerRefund">
        <div className="text-insertRefund">
            <h1>THÔNG TIN HOÀN TIỀN</h1>
        </div>

        <div className="white-section">

        <div className="inforRefund">
            <form className="form-signinRefund">
                <div className="mb-3 row text-xl-center">
                    <label htmlFor="inputFullname" className="col-sm-2 col-form-label">STK</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-controlRefund" id="inputFullname" placeholder="vd: Nguyen Van A" />
                    </div>
                </div>
                <div className="mb-3 row text-xl-center">
                    <label htmlFor="inputDay" className="col-sm-2 col-form-label">TÊN</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-controlRefund" id="inputDay" placeholder="" />
                    </div>
                </div>
                <div className="mb-3 row text-xl-center">
                    <label htmlFor="inputTicketCode" className="col-sm-2 col-form-label">NGÂN HÀNG</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-controlRefund" id="inputTicketCode" />
                    </div>
                </div>

                <div className="row text-xl-center">
                    <div className="col-sm-10">
                        <button type="submit" className="btn search" id="btnSearch">Xác nhận</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </div>
    );
};
export default Refund;