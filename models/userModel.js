import dbPool from "../config/db.js";
import { nanoid } from "nanoid";
import { encryptPassword } from "../utils/myLibraries.js";

class User {
    static getAll() {
        const sql = "SELECT * FROM users";
        return dbPool.query(sql);
    }

    static getById(id) {
        const sql = "SELECT name, email, phone, gender, address FROM users WHERE id = ?";
        const value = [id];

        return dbPool.query(sql, value);
    }

    static auth(email){
        const sql = "SELECT * FROM users WHERE email = ?";
        const value = [email];

        return dbPool.query(sql, value);
    }

    static async store({ name, email, password, phone, gender, address }) {
        const passwordHash = await encryptPassword(password)
        const sql = "INSERT INTO users (id,name,email,password,phone,gender,address) VALUES (? ,?, ?,?, ?,?, ?)";
        const value = [nanoid(25),name, email, passwordHash , phone, gender, address];

        return dbPool.query(sql, value)
    }
    
    static async update({ id, name, email, password, phone, gender, address }) {
        const passwordHash = await encryptPassword(password)
        const sql = "UPDATE users SET name = ?,email = ?,password = ?,phone = ?,gender = ?,address = ? WHERE id = ?";
        const value = [name, email, passwordHash , phone, gender, address,id];

        return dbPool.query(sql, value)
    }

    static delete (id) {
        const sql = "DELETE FROM users WHERE id = ?";
        const value = [id];

        return dbPool.query(sql, value);
    }
}

export default User