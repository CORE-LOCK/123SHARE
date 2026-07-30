import { useNavigate } from "react-router-dom"
const Header = () => {

    const navigate = useNavigate();
  return (
    <div className="w-full flex items-center p-8 bg-[#1D204A] h-[10vh]"><img onClick={()=>{navigate("/")}} className="cursor-pointer w-[50px] h-[50px]" src="https://www.sendfilestotv.app/web/image/website/1/logo/Send%20Files%20To%20TV?unique=9f4893f" /></div>
  )
}

export default Header