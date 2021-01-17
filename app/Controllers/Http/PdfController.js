"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Helpers = use("Helpers");
const ejs = require("ejs");
const puppeteer = require("puppeteer");

const logo =
  "https://i.pinimg.com/originals/b9/8a/ec/b98aecd652d202842fb3e5e48d4eecd1.jpg";

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
    ejs.renderFile(
      "./resources/views/pdf-model.ejs",
      { data },
      async (err, html) => {
        if (err) {
          console.log("Error", err);
        } else {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.setContent(html);
          await page.pdf({
            path: "./resources/files/sample.pdf",
            format: "A4",
          });
          await browser.close();
        }
      }
    );
    // Adonis: force download
    // return response.attachment(Helpers.resourcesPath("files/generate.pdf"));
    // Adonis: browser download page
    return response.download(Helpers.resourcesPath("files/sample.pdf"));
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
