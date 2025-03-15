import useDetectDevice from "../hooks/useDetectDevice";
import useObjectClick from "../hooks/useObjectClick";
import { UserAccount } from "../types/User"
import ListItem from "./ListItem";

type UserItemType = {
    userAccount: UserAccount;
    pronouns: string;
}


const UserItem = ({ userAccount, pronouns }: UserItemType) => {
    const { handleObjectClicked } = useObjectClick();
    const { isMobile, isTablet } = useDetectDevice();

    const userSlimes = userAccount.slimes.filter((slime) => !slime.isOnMarket);
    const marketSlimes = userAccount.slimes.filter((slime) => slime.isOnMarket);


    return (
      <div>
        {userAccount ?
            (
            <div>
                <h2>{userAccount.username}</h2>
                <p>{pronouns} {userAccount.gold} gold</p>
                {userSlimes.length > 0 ? (<div>
                    <h3>Slimes</h3>
                    <div className="flex children-min-w-200px">
                        {userSlimes.map((slime) => { 
                            return (
                                <ListItem key={slime.id}
                                    name={slime.name} body={""} svg={slime.svg}
                                    handleItemClick={() => { handleObjectClicked(slime, "/slime/", "currentSlime") }}
                                />
                            )})}
                    </div>
                </div>) : <></> }
                {marketSlimes.length > 0 ? (<div>
                    <h3>Slimes for Sale</h3>
                    <div className="flex children-min-w-200px">
                        {marketSlimes.map((slime) => {
                            return (
                                <ListItem key={slime.id}
                                    name={slime.name} body={""} svg={slime.svg}
                                    handleItemClick={() => { handleObjectClicked(slime, "/slime/", "currentSlime") }}
                                />
                            )})}
                    </div>
                </div>) : <></>}
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