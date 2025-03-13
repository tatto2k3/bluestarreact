import React, {useState } from 'react';
import "./SignUp.css";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    
    const handleSave = async () => {
        if (!isValidData()) {
            alert("Invalid email data");
            return;
        }

        if (password != confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }

        const accountData = {
            email: email,
            password: password,
            name: name,
            position: 'Nhân viên'

        };
        try {
            const response = await fetch('https://bluestarbackend.vercel.app/api/api/account/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
    });
            if (response.ok) {
                const responseData = await response.json();
                console.log('Response Data:', responseData);

                setRegistrationStatus('success');
                setShowModal(true);
                // Optional: You can redirect to sign-in page after a delay
                setTimeout(() => {
                    navigate('/sign-in');
                }, 3000);
              
            } else {
                const responseData = await response.json();
        console.error('Registration failed!', responseData);
        setRegistrationStatus('failure');
        setShowModal(true);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setRegistrationStatus('error');
            setShowModal(true);
        }
    };

    const isValidData = () => {
        return (
            email.trim() !== ""
        );
    };
    return (
        
        <div className="container">
    
            <div className="text-insertSignUp">
                
           
                <h1>Tạo tài khoản mới</h1>
                
            </div>


            <div className="white-section">

                <div className="inforSignUp">
                    <form className="form-signin1" >
                        <div className="mb-6">
                            <label htmlFor="inputEmail" className="col-form-label">Họ và tên</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder=""
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="inputEmail" className="col-form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="inputPassword" className="col-form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="inputPassword" className="col-form-label">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name = "confirmPassword"
                                placeholder=""
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            
                        </div>
                        
                        <div className="mb-3 d-flex justify-content-between">
                        <div className="btn btn-primary btn-block" id="btnLogin2" onClick={handleSave}>Tạo tài khoản</div>
                            
                        </div>
                        <a href="/sign-in">Đã có tài khoản ?</a>
                    </form>
                    {showModal && (
                        <div className="modal" style={{ display: 'block' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Thông báo</h5>
                                        <button type="button" className="close" onClick={() => setShowModal(false)}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        {registrationStatus === 'success' && (
                                            <p>Đăng ký thành công! Bạn sẽ được chuyển hướng sau vài giây.</p>
                                        )}
                                        {registrationStatus === 'failure' && (
                                            <p>Đăng ký không thành công. Vui lòng thử lại.</p>
                                        )}
                                        {registrationStatus === 'error' && (
                                            <p>Đã có lỗi xảy ra trong quá trình đăng ký.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    );
}
