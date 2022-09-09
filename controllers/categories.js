let express = require('express')
let db = require('../models')
const category = require('../models/category')
let router = express.Router()

router.get('/', async (req, res) => {
    try {
        const allCategories = await db.category.findAll()
        // console.log(allCategories)
        res.render('categories/show', { categories: allCategories })
    }
    catch (error) {
        res.status(400).render('main/404')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const category = await db.category.findOne({
            where: {
                id: req.params.id
            }
        })
        const projects = await category.getProjects()
        console.log(`${category} was used in ${projects.length} projects`)
        res.render('categories/projects', { category: category, projects: projects })
    }
    catch (error) {
        console.log(error)
        res.status(400).render('main/404')
    }
})





module.exports = router