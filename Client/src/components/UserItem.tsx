import { useNavigate } from "react-router-dom";
import { UserAccount } from "../types/User"
import parse from "html-react-parser";

type UserItemType = {
    userAccount: UserAccount | undefined;
    pronouns: string;
}


const UserItem = ({ userAccount, pronouns }: UserItemType) => {
    const navigate = useNavigate();

    return (
      <div>
        {userAccount ?
            (
            <div>
                <h2>{userAccount.username}</h2>
                <p>{pronouns} {userAccount.gold} gold</p>
                <p>{pronouns} {userAccount.slimes.length} slimes.</p>
                <div className="flex">
                    {userAccount.slimes.map((slime) => {
                        return (
                            <div key={slime.id}>
                                <div onClick={() => { navigate("/slime/" + slime.id) }} key={slime.id} className="market-item image-wrapper">
                                    {parse(slime.svg)}
                                </div>
                                <p>{slime.name}</p>
                            </div>
                        )
                    }) }
                </div>
                <p>{pronouns} {userAccount.friends.length} friends.</p>
            </div >
            ) :
            (
                <div>
                    <h2>Can not find this user</h2>
                </div>
            )
        }
      </div>
  );
}

export default UserItem;