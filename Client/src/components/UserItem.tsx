import useObjectClick from "../hooks/useObjectClick";
import { UserAccount } from "../types/User"
import parse from "html-react-parser";

type UserItemType = {
    userAccount: UserAccount;
    pronouns: string;
}


const UserItem = ({ userAccount, pronouns }: UserItemType) => {
    const { handleObjectClicked } = useObjectClick();

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
                                <div onClick={() => { handleObjectClicked(slime, "/slime/", "currentSlime") }}
                                    key={slime.id} className="market-item image-wrapper"
                                >
                                    {slime.svg != "" ? parse(slime.svg) : <></>}
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