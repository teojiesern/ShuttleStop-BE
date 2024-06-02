const CiamService = require('../services/ciamService');
const CustomerService = require('../services/customerService');
const { Resend } = require('resend');

const login = async (req, res) => {
    try {
        const customer = await CustomerService.getCustomerByEmail(req.body.email);

        if (!customer) {
            return res.status(404).json({
                type: 'user-not-found',
            });
        }

        const passwordMatch = await CiamService.authenticateCustomer(customer, req.body.password);

        if (!passwordMatch) {
            return res.status(401).json({
                type: 'incorrect-password',
            });
        }

        // 1 day expiry
        res.cookie('shuttle-token', customer.customerId, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

        return res.json({
            customer,
        });
    } catch (err) {
        return res.status(401).json({
            error: 'Could not sign in',
        });
    }
};

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const resend = new Resend(process.env.RESEND_API_KEY);
        const OTPNumber = Math.floor(100000 + Math.random() * 900000);

        await resend.emails.send({
            from: 'ShuttleStop <onboarding@resend.dev>',
            to: email,
            subject: 'ShuttleStop OTP code to reset password',
            html: `<!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        background-color: #ffffff;
                        font-family: 'HelveticaNeue,Helvetica,Arial,sans-serif';
                    }
                    .container {
                        background-color: #ffffff;
                        border: 1px solid #eee;
                        border-radius: 5px;
                        box-shadow: 0 5px 10px rgba(20,50,70,.2);
                        margin-top: 20px;
                        max-width: 360px;
                        margin: 0 auto;
                        padding: 68px 0 130px;
                    }
                    .logo {
                        margin: 2rem auto;
                        width: 80%;
                    }
                    .secondary {
                        color: #000;
                        display: inline-block;
                        font-family: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif';
                        font-size: 20px;
                        font-weight: 500;
                        line-height: 24px;
                        margin-bottom: 0;
                        margin-top: 0;
                        margin-left: 2rem;
                        margin-right: 2rem;
                        text-align: center;
                    }
                    .code-container {
                        background: rgba(0,0,0,.05);
                        border-radius: 4px;
                        margin: 16px auto 14px;
                        vertical-align: middle;
                        width: 280px;
                    }
                    .code {
                        color: #000;
                        display: inline-block;
                        font-family: 'HelveticaNeue-Bold';
                        font-size: 32px;
                        font-weight: 700;
                        letter-spacing: 6px;
                        line-height: 40px;
                        padding-bottom: 8px;
                        padding-top: 8px;
                        margin: 0 auto;
                        width: 100%;
                        text-align: center;
                    }
                    .paragraph {
                        color: #444;
                        font-size: 15px;
                        font-family: 'HelveticaNeue,Helvetica,Arial,sans-serif';
                        letter-spacing: 0;
                        line-height: 23px;
                        padding: 0 40px;
                        margin: 0;
                        text-align: center;
                    }
                    .link {
                        color: #444;
                        text-decoration: underline;
                    }
                    .footer {
                        color: #000;
                        font-size: 12px;
                        font-weight: 800;
                        letter-spacing: 0;
                        line-height: 23px;
                        margin: 0;
                        margin-top: 20px;
                        font-family: 'HelveticaNeue,Helvetica,Arial,sans-serif';
                        text-align: center;
                        text-transform: uppercase;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1 class="secondary">Enter the following code to reset your password</h1>
                    <div class="code-container">
                        <p class="code">${OTPNumber}</p>
                    </div>
                    <p class="paragraph">Not expecting this email?</p>
                    <p class="paragraph">
                        Contact 
                        <a href="mailto:shuttlestop@gmail.com" class="link">shuttlestop@gmail.com</a> 
                        if you did not request this code.
                    </p>
                </div>
                <p class="footer">Securely powered by ShuttleStop.</p>
            </body>
            </html>`,
        });

        res.json({
            OTPNumber,
        });
    } catch (error) {
        return res.status(401).json({
            error: error.message,
        });
    }
};

const hasCookie = (req, res, next) => {
    if (!req.cookies || !req.cookies['shuttle-token']) {
        return res.status(401).json({
            error: 'User is not logged in',
        });
    }
    next();
};

module.exports = {
    login,
    sendOTP,
    hasCookie,
};
