const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const marked = require('marked');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/convert', (req, res) => {
    try{
        const markdown = req.body.markdown;
        const html = marked.parse(markdown);
        res.status(200).json({ html });
    }catch(err){
        console.log(err);
        res.status(400).json({ error: 'Failed to convert Markdown to HTML' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});