import { useNavigate } from "react-router-dom"

function Login() {
    let navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/MainFamilyPage');
    }
    return (
        <>
            <div>
                <h1>Login</h1>
                <label>
                    <p>Family identifier</p>
                    <input

                    />
                </label>
                <label>
                    <p>Family password</p>
                    <input

                    />
                </label>
                <div>
                    <button onClick={handleLogin}>
                        Login
                    </button>
                </div>
                <div>
                    <a href="/">
                        <button >
                            Back
                        </button>
                    </a>
                </div>
            </div>

        </>
    )
}

export default Login