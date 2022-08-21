import * as React from "react";
import { useState} from "react";
import {Signup as APISignup} from "../../api/User";
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilLockLocked, cilUser} from "@coreui/icons";
import {APIConstants} from "../../utils/constants";
import {useNavigate} from "react-router-dom";
export const Signup = (props) => {
    const navigation = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()
    const doSignup = (e) => {
        e.preventDefault()
        if(!email || !password || !passwordConfirm || passwordConfirm != password) {
            alert("Error: all sign in fields must be completed and passwords must match.")
        }
        APISignup(email, password).then((response) => {
            const authHeader = response.headers.get(APIConstants.AuthorizationHeaderKey)
            if(authHeader) {
                window.localStorage.setItem(APIConstants.AuthorizationHeaderKey, authHeader)
                navigation('/songs')
            }else {
                window.localStorage.removeItem(APIConstants.AuthorizationHeaderKey)
                alert("Register failed.")
            }
        }).catch((error) => {
            alert("OOps! " + error)
            window.localStorage.removeItem(APIConstants.AuthorizationHeaderKey)
        })
    }
    return <article>
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm onSubmit={doSignup}>
                                    <h1>Register</h1>
                                    <p className="text-medium-emphasis">Create your account</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>@</CInputGroupText>
                                        <CFormInput placeholder="Email" autoComplete="email"
                                                    onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="new-password"
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Repeat password"
                                            autoComplete="new-password"
                                            onChange={(event) => setPasswordConfirm(event.target.value)}
                                        />
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="success" type="submit">Create Account</CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    </article>
}