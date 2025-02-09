import { useCallback, useEffect, useState, useRef} from "react"


function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  let passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
      let pass = ''
      let str = "ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklmnopgrstuvwxyz"

      if(numberAllowed) str += "0123456789"
      if(charAllowed) str += "~!@#$%&*()_+|{}[]"

      for (let i = 0; i < length; i++) {
        let char = Math.floor(Math.random()*str.length + 1)
        pass += str.charAt(char)
        
      }
      setPassword(pass)
  }, 
  [length, numberAllowed, charAllowed, setPassword])

  useEffect((params) => {
    passwordGenerator()
  },[length, numberAllowed, charAllowed])



  const copyToClipbord = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current.setSelectioRange(0,3);
    window.navigator.clipboard.writeText(password)
  },[password]
  )


  return (
   <>
    <div className="w-full max-w-md mx-auto px-4 my-8 text-orange-500 bg-gray-700 text-center rounded-3xl">

      <div className="p-6">

        <h3 className="my-2 text-2xl">Password Generator</h3>
          <input
          type="text" 
          placeholder="Password"
          value={password}
          className="p-3 rounded-s-full"
          />
          <button 
          className="bg-blue-600 text-white p-3 rounded-e-full"
          onClick={()=>copyToClipbord()}
          >Copy</button>
      </div>
      <div className="flex justify-center items-center gap-5 w-full">

        <div className="justify-center flex">
        <input
        onChange={(e)=>{setLength(e.target.value)}}
        type="range" />
        <label htmlFor="">lenght: {length}</label>
        </div>

        <div className="justify-center flex">
        <input 
        onChange={()=>{setNumberAllowed((prev)=>!prev)}}
        type="checkbox" />
        <label htmlFor="">Number</label>
        </div>

        <div className="justify-center flex">
        <input 
        onChange={()=>{setCharAllowed((prev)=>!prev)}}
        type="checkbox" />
        <label htmlFor="">Char</label>
        </div>
      </div>
     
    </div>
   </>
  )
}

export default App
