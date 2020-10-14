import { Request, Response } from "express";
// import * as Yup from 'yup';
// import CreateOrphanageService from '../services/CreateOrphanageService';
// import ListOrphanagesService from '../services/ListOrphangesService';
// import ShowOrphanageService from '../services/ShowOrphanageService';

import orphanageView from "../views/orphanages_view";

export default class OrphanagesController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((image: Express.Multer.File) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    // const schema = Yup.object().shape({
    //   name: Yup.string().required(),
    //   latitude: Yup.number().required(),
    //   longitude: Yup.number().required(),
    //   about: Yup.string().required().max(300),
    //   instructions: Yup.string().required(),
    //   opening_hours: Yup.string().required(),
    //   open_on_weekends: Yup.boolean().required(),
    //   images: Yup.array(
    //     Yup.object().shape({
    //       path: Yup.string().required(),
    //     }),
    //   ),
    // });

    // await schema.validate(data, {
    //   abortEarly: false,
    // });

    const createOrphanageService = new CreateOrphanageService();
    const orphanage = await createOrphanageService.execute(data);

    return response.status(201).json(orphanage);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listOrphanagesService = new ListOrphanagesService();

    const orphanages = await listOrphanagesService.execute();

    return response.json(orphanageView.renderMany(orphanages));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrphanageService = new ShowOrphanageService();
    const orphanage = await showOrphanageService.execute(Number(id));

    return response.json(orphanageView.render(orphanage));
  }
}
