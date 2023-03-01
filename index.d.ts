import { NextRequest } from "next/server";

export { };

declare global {
    interface Window {
        $: any;
        jQuery: any;
        Razorpay: any;
    }

    export interface NewNextRequest {
        req: {
            cookies: {
                accessToken: string
            }
        }
    }

}