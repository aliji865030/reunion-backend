const express = require('express');
const Property = require('../models/Property');
const auth = require('../middleware/auth');
const router = express.Router();

// Fetch all properties
router.get('/list-properties', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Add a property
router.post('/property', auth, async (req, res) => {
    const { type, amount_per_day, name_of_property, address, no_of_beds, no_of_bathrooms, liked, size_of_room, amenities, available_from, image_link, contact_info } = req.body;

    try {
        const newProperty = new Property({ type, amount_per_day, name_of_property, address, no_of_beds, no_of_bathrooms, liked, size_of_room, amenities, available_from, image_link, contact_info, owner: req.user.id });
        await newProperty.save();
        res.json(newProperty);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update a property
router.put('/property/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findById(id);
        if (!property || property.owner.toString() !== req.user.id) return res.status(404).json({ msg: 'Property not found or unauthorized' });

        Object.assign(property, req.body);
        await property.save();
        res.json(property);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete a property
router.delete('/property/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findById(id);
        if (!property || property.owner.toString() !== req.user.id) return res.status(404).json({ msg: 'Property not found or unauthorized' });

        await property.remove();
        res.json({ msg: 'Property removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// List my properties
router.get('/property', auth, async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user.id });
        res.json(properties);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;