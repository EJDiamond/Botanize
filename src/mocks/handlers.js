import { rest } from "msw";

const baseURL = "https://botanize-api.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json({
            "pk": 3,
            "username": "George",
            "email": "",
            "first_name": "",
            "last_name": "",
            "profile_id": 3,
            "profile_image": "https://res.cloudinary.com/ejdiamo/image/upload/v1/media/images/matheus-ferrero-pg_WCHWSdT8-unsplash_wlfmss"
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
];