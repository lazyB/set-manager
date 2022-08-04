import * as React from "react";
import { useState} from "react";
import {Login as APILogin} from "../../api/User";
import {APIConstants} from "../../utils/constants";
import {Link, useNavigate} from "react-router-dom";
import CIcon from "@coreui/icons-react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow
} from "@coreui/react";
import {cilLockLocked, cilUser} from "@coreui/icons";
import {AppRoutes} from "../../navigation/AppRouter";
export const Login = (_) => {
    console.log("login")
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const navigation = useNavigate()
    const doLogin = (e) => {
        e.preventDefault()
        APILogin(email, password).then((response) => {
            const authHeader = response.headers.get(APIConstants.AuthorizationHeaderKey)
            if(authHeader) {
                window.localStorage.setItem(APIConstants.AuthorizationHeaderKey, authHeader)
                navigation('/')
            }else {
                window.localStorage.removeItem(APIConstants.AuthorizationHeaderKey)
                alert("Login failed.")
            }
        }).catch((error) => {
            alert("OOps! " + error)
            window.localStorage.removeItem(APIConstants.AuthorizationHeaderKey)
        })
    }
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={doLogin}>
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="email" autoComplete="email"
                                                        type={"email"} value={email} onChange={(event) => setEmail(event.target.value)} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                value={password} onChange={(event) => setPassword(event.target.value)}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4" type="submit">
                                                    Login
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0">
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <Link to={AppRoutes.User.SignUp}>
                                            <CButton color="primary" className="mt-3" active tabIndex={-1}>
                                                Register Now!
                                            </CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}