const { Constants } = require('eris');

class ActionRowBuilder {
    constructor(setType = true) {
        if (setType) this.type = 1;
        this.components = [];
    }

    addComponents(...components_object) {
        for (const component of components_object) {
            if (Array.isArray(component)) {
                for (const c of component) {
                    this.components.push(c);
                }
            } else {
                this.components.push(component);
            }
        }

        return this;
    }
}

const ButtonStyle = {
    Primary: 1,
    Secondary: 2,
    Success: 3,
    Danger: 4
}

class ButtonBuilder {
    constructor() {
        this.type = 2;
        this.style = 1;
    }

    setCustomId(custom_id) {
        this.custom_id = custom_id;
        return this;
    }

    setLabel(label) {
        this.label = label;
        return this;
    }

    setStyle(style) {
        this.style = style;
        return this;
    }

    setURL(url) {
        this.style = 5;
        this.url = url;
        return this;
    }

    setDisabled(disabled = true) {
        this.disabled = disabled;
        return this;
    }

    setEmoji(emoji) {
        if (typeof emoji === 'object') {
            const { name, id } = emoji;

            this.emoji = {
                name,
                id
            };
        } else {
            this.emoji = {
                name: emoji
            };
        }
        return this;
    }
}

class EmbedBuilder {
    constructor() {
        this.fields = [];
    }

    setColor(color) {
        this.color = parseInt(color.startsWith('#') ? color.slice(1) : color, 16);
        return this;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setURL(url) {
        this.url = url;
        return this;
    }

    setAuthor({ name, iconURL, url }) {
        this.author = { name, icon_url: iconURL, url };
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }

    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }

    addField(name, value, inline) {
        this.addFields([ { name, value, inline } ]);
        return this;
    }

    addFields(fields) {
        for (const { name, value, inline = false } of fields) {
            this.fields.push({ name, value, inline });
        }
        return this;
    }

    setImage(url) {
        this.image = { url };
        return this;
    }

    setFooter({ text, icon_url }) {
        this.footer = { text, icon_url };
        return this;
    }
}

const TextInputStyle = {
    Short: 1,
    Paragraph: 2
}

class ModalBuilder extends ActionRowBuilder {
    constructor() {
        super(false);
    }

    setCustomId(custom_id) {
        this.custom_id = custom_id;
        return this;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }
}

class TextInputBuilder {
    constructor() {
        this.type = 4;
    }
    
    setCustomId(custom_id) {
        this.custom_id = custom_id;
        return this;
    }

    setLabel(label) {
        this.label = label;
        return this;
    }

    setStyle(style) {
        this.style = style;
        return this;
    }

    setMaxLength(max_length) {
        this.max_length = max_length;
        return this;
    }

	setMinLength(min_length) {
        this.min_length = min_length;
        return this;
    }

	setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        return this;
    }

	setValue(value) {
        this.value = value;
        return this;
    }

	setRequired(required = true) {
        this.required = required;
        return this;
    }
}

const SelectMenuTypes = {
    String: 3,
    User: 5,
    Role: 6,
    Mentionable: 7,
    Channel: 8
};

class SelectMenuBuilder {
    constructor() {
        this.type = 3;
        this.options = [];
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setCustomId(custom_id) {
        this.custom_id = custom_id;
        return this;
    }

    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        return this;
    }

    setMinValues(min_values) {
        this.min_values = min_values;
        return this;
    }

    setMaxValues(max_values) {
        this.max_values = max_values;
        return this;
    }

    setDisabled(disabled = true) {
        this.disabled = disabled;
        return this;
    }
    
    addOption(option) {
        this.addOptions([ option ]);
        return this;
    }

    addOptions(options) {
        for (const option of options) { // { label, value, description, emoji, default }
            this.options.push(option);
        }
        return this;
    }
}

module.exports = { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, TextInputStyle, TextInputBuilder, SelectMenuBuilder, SelectMenuTypes }