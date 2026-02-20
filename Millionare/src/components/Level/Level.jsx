import classNames from "classnames";

export function Level({isCurrentLevel,levelNum,reward}){

    const rewardClassName= classNames("level__reward",{
        current: isCurrentLevel,
    });

    return (
        <li className="level">
            <div className="level__info">
                <span className="level__number">{levelNum+1}</span>
                <span className={rewardClassName}>{reward} €</span>
            </div>
        </li>
                 
    )
}