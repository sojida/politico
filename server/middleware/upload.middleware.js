import db from '../database/config.db';
import queries from '../database/queries.db';

const middleware = {
  validateUpload(req, res, next) {
    let verified = true;
    const error = [];

    if (req.files) {
      if (req.files.passporturl) {
        req.body.passporturl = req.files.passporturl.name;
      }
    }

    const { passporturl } = req.body;


    if (passporturl) {
      if ((!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(passporturl))) {
        verified = false;
        error.push({ passporturl: 'invalid format' });
      }
    } else {
      verified = false;
      error.push({ passporturl: 'pic must be present' });
    }

    if (!verified) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    return next();
  },

  async updateUserPic(req, res) {
    if (req.files) {
      if (req.files.passporturl) {
        req.body.passporturl = `${Date.now()}-${req.files.passporturl.name}`;
        req.files.passporturl.mv(`./server/uploads/${req.body.passporturl}`, err => err);
      }
    }

    const { rows } = await db(queries.updateProfilePic(req.body.passporturl.trim(), req.user.id));

    res.status(200).json({
      status: 200,
      data: rows[0].passporturl,
      message: 'upload successful',
    });
  },


};


export default middleware;
