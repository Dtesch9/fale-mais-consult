import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.QUERY]: Joi.object().keys({
    origin: Joi.string().length(3).required(),
    destination: Joi.string().length(3).required(),
    time: Joi.number().min(1).required(),
    plan: Joi.number().valid(30, 60, 120).required(),
  }),
});
