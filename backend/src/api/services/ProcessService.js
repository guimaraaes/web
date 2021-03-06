const { response } = require("express");
const ProcessModel = require("../models/ProcessModel");

class ProcessService {
  async FindAll(req, res) {
    const page = parseInt(req.query.page);

    await ProcessModel.find()
      // .select({ _id: 1, inprogress: 1, title: 1 })
      .sort({ inprogress: -1, title: -1 })
      .skip((page - 1) * 8)
      .limit(8)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async FindInfo(req, res) {
    var total_active = 0;
    var req_title = "";

    req.params.title_process_search
      ? (req_title = String(req.params.title_process_search))
      : (req_title = "");
    await ProcessModel.find({ title: { $regex: req_title } })
      // .select({ _id: 1, inprogress: 1, title: 1 })

      .then((response) => {
        response.map((i) => {
          i.inprogress ? total_active++ : total_active;
        });
        return res.status(200).json({
          total: response.length,
          total_active: total_active,
          last_page: Math.ceil(response.length / 1),
        });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async FindById(req, res) {
    await ProcessModel.findById(req.params.id)
      .sort({ inprogress: -1 })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async FindByTitle(req, res) {
    const page = parseInt(req.query.page);
    await ProcessModel.find({ title: { $regex: req.params.title } })
      .sort({ inprogress: -1 })
      .skip((page - 1) * 8)
      .limit(8)
      .then((response) => {
        if (response) return res.status(200).json(response);
        else return res.status(404).json("processo não encontrado");
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async Create(req, res) {
    const process = new ProcessModel(req.body);
    await process
      .save()
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async Edit(req, res) {
    await ProcessModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  //   async Delete(req, res) {
  //     await ProcessModel.findByIdAndDelete(req.params.id)
  //       .then((response) => {
  //         if (response) return res.status(200).json("processo excluído");
  //         else return res.status(404).json("processo não encontrado");
  //       })
  //       .catch((error) => {
  //         return res.status(500).json(error);
  //       });
  //   }
}
module.exports = new ProcessService();
