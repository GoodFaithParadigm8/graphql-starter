// Named export = Has a name. Have as many as you need.
// Default export - Has no name. You can only have one

const message = "some message form myModule.js"
const name = "Jason Sprouse"
const location = "Dallas"

const getGreeting = (name) => {
    return `Welcome to the course ${name}`
}

export { message, name, getGreeting, location as default }