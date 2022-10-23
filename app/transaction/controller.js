const { populate } = require("./model");
const Transaction = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const transactions = await Transaction.find().populate("player");

      res.render("admin/transaction/view_transaction", {
        transactions,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const hasil = await Transaction.findOneAndUpdate({ _id: id }, { status });

      console.log(">>>>>>>>", status, id, "===============", hasil);

      req.flash("alertMessage", `Berhasil mengubah status transaksi`);
      req.flash("alertStatus", "success");
      res.redirect("/transaction");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
};
