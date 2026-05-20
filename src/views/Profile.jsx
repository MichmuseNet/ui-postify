import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { HiHome } from "react-icons/hi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Profile = () => {

    let { userId } = useParams();
    console.log(userId);

    const url = "http://localhost:8000/users/${userId}/posts";
    const {data, loading, error} = useFetch(url);

    console.log(data)

    return (
        <>
            <div className="flex flex-col">

                <div className="h-[80px] bg-amber-500 flex gap-4">
                    <div>Andrea</div>
                    <div>Followers</div>
                    <div>Post</div>
                </div>
                <div className="h-[560px] bg-red-300">
                    <div className="h-[150px] w-[120px] bg-orange-800">

                    </div>
                </div>
                <div className="h-[50px] bg-blue-300 flex gap-4">
                    <HiHome className="w-10, h-10"/>
                    <MdOutlineVideoLibrary className="w-10, h-10"/>
                    <TiMessages className="w-10, h-10"/>
                    <FaSearch className="w-10, h-10"/>
                    <FaUser className="w-10, h-10"/>
                </div>
            </div>
        </>
    )
}

export default Profile;