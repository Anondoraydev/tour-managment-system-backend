import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { Role } from "../modules/user/user.interfaces";
import { User } from "../modules/user/user.model";
import { envVars } from "./env";

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0].value;

        if (!email) {
          return done(null, false, { message: "Email not found" });
        }

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            role: Role.USER,
            picture: profile.photos?.[0].value,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }
        return done(null, user, { message: "User created successfully" });
      } catch (error) {
        console.log("google strategy error", error);
        return done(error);
      }
    }
  )
);

// Fonend localhost:5100 -> localhost:5000/api/v1/auth/google -> passport -> google OAuth consent -> gmail login -> success ->callback url localhost:5100/api/v1/auth/google/callback -> db store-> token

//Bridge == google -> user db store -> token
// Costom -> email ,password , role: USER, name:... -> register -> DB -> 1 user create
//Google -> req -> google -> success -> successful:jwt token : Role, email -> DB - store ->  token - api access

passport.serializeUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id);
  }
);

passport.deserializeUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (id: string, done: (err: any, user?: any) => void) => {
    try {
      const user = User.findById(id);
      done(null, user);
    } catch (error) {
      console.log(error)
      done(error);
    }
  }
)
