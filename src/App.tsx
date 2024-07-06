import './App.css'


function App(){

    return (
        <>
            <video controls width={800}>
                <source src="/src/assets/guide.mp4" type="video/mp4"/>
            </video>
            <h1>Vite + React</h1>
            <div className="button" onClick={() => {
                window.location.href = "/#about"
            }}>日历范围选择器
            </div>

        </>
    )
}

export default App
