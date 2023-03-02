import axios from "axios";
import moment from "moment";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginApiEndpoint, registerApiEndpoint, verifyOtpApiEndpoint } from "../../../http/index";

async function refreshAccessToken(tokenObject: any) {
  try {
    // Get a new set of tokens with a refreshToken
    const { data, status } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`, {
      headers: {
        Authorization: `Bearer ${tokenObject.refreshToken}`
      }
    });

    return {
      ...tokenObject,
      user: data.data.user,
      accessToken: data.data.accessToken,
      accessTokenExpiry: data.data.accessTokenExpiry,
      refreshToken: data.data.refreshToken
    }
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    }
  }
}

const authOptions: NextAuthOptions = {
  secret: "b11h7SI@6Xys&inSq!rnx5i7Q9&RiXSjaEuD*RVXxzW2rEM20t",
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { name, email, password, register, phone, otp, hash } = credentials as {
          name: string;
          email: string;
          password: string;
          register: boolean;
          phone: number;
          otp: number;
          hash: string;
        }
        try {
          if (register) {
            const { data, status } = await registerApiEndpoint({ name, email, password });
            if (status === 201) {
              return data.data;
            } else {
              throw new Error(data.error.message)
            }
          } else {
            if (phone) {
              const { data, status } = await verifyOtpApiEndpoint({ phone, otp, hash })
              if (status === 200) {
                return data.data;
              } else {
                throw new Error(data.error.message)
              }
            } else {
              const { data, status } = await loginApiEndpoint({ email, password });
              if (status === 200) {
                return data.data;
              } else {
                throw new Error(data.error.message)
              }
            }
          }
        } catch (error: any) {
          throw new Error(error?.response?.data?.error?.message || "Invalid email or password");
        }

      }
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
  },
  callbacks: {
    async jwt({ token, user, account }:any) {
      if (account && user) {
        return {
          ...token,
          user: user.user,
          accessTokenExpiry: user.accessTokenExpiry,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      // now check the accessTokenExpiry
      const REFRESH_TOKEN_EXPIRY = moment(Date.now()).diff(token.accessTokenExpiry as any).toString()
      const expiryTime: number = parseInt(REFRESH_TOKEN_EXPIRY)
      
      if (expiryTime > 0) {
        token = refreshAccessToken(token) as any
        return token;
      }
      return token;
    },
    async session({ session, token } : any) {
      session.user.info = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpiry = token.accessTokenExpiry;
      session.error = token.error;
      return session;
    },
  },

}

export default NextAuth(authOptions);

// const nextAuthOptions : NextAuthOptions = (req, res) => {
//   return {
//     secret: 'b11h7SI@6Xys&inSq!rnx5i7Q9&RiXSjaEuD*RVXxzW2rEM20t',
//     providers: [
//       CredentialsProvider({
//         async authorize(credentials) {
//           console.log("🚀 ~ file: [...nextauth].js ~ line 11 ~ authorize ~ credentials", credentials)
//           try {
//             const { name, email, password, typeRegister, phone, otp, hash } = credentials;
//             let response;
//             if (typeRegister) {
//               response = await register({ name, email, password });
//             } else {
//               if (otp) {
//                 response = await verifyOtpApiEndpoint({ phone, otp, hash });
//               } else {
//                 response = await loginApiEndpoint({ email, password });
//               }
//             }
//             const cookies = response.headers['set-cookie']
//             res.setHeader('Set-Cookie', cookies)

//             return {
//               name: response.data.data,
//             };
//           } catch (error) {
//             throw new Error(error?.response?.data?.error?.message || 'Something went wrong');
//           }
//         },

//         pages: {
//           signIn: "/login",
//           signOut: "/auth/signout",
//         },
//         session: {
//           jwt: true,
//           //set the maxt age 30 days
//           maxAge: 7 * 24 * 60 * 60 * 60, // 30 days
//         },
//       }),
//     ]
//   }
// }

// export default (req, res) => {
//   return NextAuth(req, res, nextAuthOptions(req, res))
// }