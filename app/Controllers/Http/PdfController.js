"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Helpers = use("Helpers");
const pdf = require("html-pdf");
const ejs = require("ejs");

const logo =
  "https://i.pinimg.com/originals/b9/8a/ec/b98aecd652d202842fb3e5e48d4eecd1.jpg";

const config = {
  // Papersize Options: http://phantomjs.org/api/webpage/property/paper-size.html
  format: "a4", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
  orientation: "portrait", // portrait or landscape

  // Page options
  border: {
    top: "10mm", // default is 0, units: mm, cm, in, px
    right: "20mm",
    bottom: "20mm",
    left: "20mm",
  },

  paginationOffset: 1, // Override the initial pagination number
  header: {
    height: "20mm",
    contents: `
    <img style="height:30px; float: right;" src="${logo}" alt="fifa logo">
    `,
  },
  footer: {
    height: "28mm",
    contents: ``,
    default: '<span style="color: #444;">{{page}}</span>',
  },

  // File options
  type: "pdf",
};

/**
 * Resourceful controller for interacting with pdfs
 */
class PdfController {
  /**
   * Show a list of all pdfs.
   * GET pdfs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new pdf.
   * GET pdfs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new pdf.
   * POST pdfs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single pdf.
   * GET pdfs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    // exemple
    const data = [
      { team: "Brazil", titles: 5 },
      { team: "Germany", titles: 4 },
      { team: "Italy", titles: 4 },
      { team: "Uruguay", titles: 2 },
    ];

    ejs.renderFile("./resources/views/pdf-model.ejs", { data }, (err, html) => {
      if (err) {
        console.log("Error", err);
      } else {
        pdf
          .create(html, config)
          .toFile("./resources/files/generate.pdf", (err, res) => {
            if (err) {
              console.log("Error", err);
            } else {
              console.log(res.filename);
            }
          });
      }
    });
    // force download
    // return response.attachment(Helpers.resourcesPath("files/generate.pdf"));
    return response.download(Helpers.resourcesPath("files/generate.pdf"));
  }

  /**
   * Render a form to update an existing pdf.
   * GET pdfs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update pdf details.
   * PUT or PATCH pdfs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a pdf with id.
   * DELETE pdfs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = PdfController;
