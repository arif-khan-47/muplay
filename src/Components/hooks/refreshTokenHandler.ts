import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshTokenHandler = (props: any) => {
    const { data } = useSession();
    const session: any = data;

    useEffect(() => {
        if (!!session) {
            // We did set the token to be ready to refresh after 55 minutes, here we set interval of 54 minutes.
            // session.accessTokenExpiry is date format, so we need to convert it to milliseconds.
            // We also need to subtract 30 seconds from the time, so that the token is refreshed before it expires.
            const timeRemaining = moment(session.accessTokenExpiry).valueOf() - moment().valueOf() - 30000;
            props.setInterval(timeRemaining > 0 ? timeRemaining : 0);
        }
    }, [session]);

    return null;
}

export default RefreshTokenHandler;
