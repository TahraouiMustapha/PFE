
class User {
    constructor(firstName, lastName, email, password, phoneNumber, wilaya) {
        this.firstName = firstName 
        this.lastName = lastName
        this.email = email
        this.password = password
        this.phoneNumber = phoneNumber
        this.wilaya = wilaya
    }
}

class Comment {
    constructor(writerName, rate, comment) {
        this.writerName = writerName
        this.rate = rate
        this.comment = comment
    }

    toPlainObject() {
        return {
            writerName: this.writerName,
            rate: this.rate,
            comment: this.comment
        }
    }
}

class Project {
    constructor(projectId, clientid, workerId, date, budget, description) {
        this.projectId = projectId
        this.clientid = clientid
        this.workerId = workerId
        this.date = date
        this.budget = budget
        this.description = description
        this.status = false
    }

    toPlainObject() {
        return {
            projectId: this.projectId,
            clientid: this.clientid,
            workerId: this.workerId,
            date: this.date,
            budget: this.budget,
            description: this.description,
            status: this.status
        };
    }
}


class Client extends User {
    constructor(uid, firstName, lastName, email, password, 
                phoneNumber, wilaya, city, province, street) {
        
        super(firstName, lastName, email, password, phoneNumber, wilaya);
        this.uid = uid
        this.city = city
        this.province = province
        this.street = street
    }

    toPlainObject() {
        return {
            uid: this.uid,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            phoneNumber: this.phoneNumber,
            wilaya: this.wilaya,
            city: this.city,
            province: this.province,
            street: this.street,
        };
    }
}

class Artisan extends User {
    constructor(uid, firstName, lastName, email, password, 
        honeNumber, wilaya, speciality, transport, tools, 
        desc) {

        super(firstName, lastName, email, password, honeNumber, wilaya);
        this.uid = uid
        this.speciality = speciality
        this.transport = transport
        this.tools = tools
        this.desc = desc
        this.rate = 0
        this.availability = true
        this.comments = [
            new Comment('Tahraoui Mustapha', 3.5, 'good job , good service thanks').toPlainObject(),
            new Comment('Abid Akram', 4, 'good job , good service thanks').toPlainObject(),
            new Comment('Zakaria Taleb', 4, 'good job , good service thanks').toPlainObject()
        ]            
    }

    toPlainObject() {
        return {
            uid: this.uid,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            phoneNumber: this.phoneNumber,
            wilaya: this.wilaya,
            speciality:this.speciality,
            transport:this.transport,
            tools:this.tools,
            desc:this.desc,
            rate:this.rate,
            availability:this.availability,
            comments:this.comments,
        }
    }
}



export {
    Client, 
    Artisan, 
    Comment, 
    Project
};






