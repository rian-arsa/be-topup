const index = async (req, res) => {
    try {
        res.render('index', { title: 'Express' });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    index,
};
