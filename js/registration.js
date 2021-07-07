

class userData {
    constructor(id, firstname, lastname, email, password, mob, securityQuestion, securityAnswer) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.mob = mob;
       
    }
}


window.addEventListener('load', async (event) => {
    console.log("In Load");


    document.getElementById('mobile').addEventListener("keyup", function (e) {
        isValidMobile();
    })

    document.getElementById('confirmpass').addEventListener("keyup", function (e) {
        isConfirmPasswordValid();
    });

    document.getElementById('registrationForm').addEventListener("submit", async function (e) {

        e.preventDefault();


        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const mob = document.getElementById('mobile').value;
        const password = md5(document.getElementById('password').value);
      


        if (isFormValid()) {
            const userId = 'User-' + uuidv4();


            const flag = (await isUserExist(email));
            console.log(flag);
            if (!flag) {
                const userdata = new userData(userId, firstname, lastname, email, password, mob);
                addUser(userdata);
                window.location.href = "../pages/login.html";
            } else {
                document.getElementById('error-msg').innerText = 'User account with this Email Id Already exists!!!!';
            }
        }


    });
});


function isValidMobile() {
    const mobile = document.getElementById('mobile');
    // console.log(mobile.value[0]);
    if (!mobile.value.match(/^[6-9]{1}[0-9]{9}$/)) {
        mobile.setCustomValidity('Mobile number only have 10 digit and must be valid');
        return false;
    } else {
        mobile.setCustomValidity('');
    }
    return true;
}

function isConfirmPasswordValid() {
    const password = document.getElementById('password');
    const confirmPass = document.getElementById('confirmpass');
    if (password.value != confirmPass.value) {
        confirmPass.setCustomValidity('Password and confirm password is not same!!!!');
        return false;
    } else {
        confirmPass.setCustomValidity('');
        return true;
    }
}

function isFormValid() {
    if (!isValidMobile()) {
        return false;
    }
    if (!isConfirmPasswordValid()) {
        return false;
    }

    return true;
}

// Unique Id generator
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16),
    );
}






async function isUserExist(email) {
    let flag = false;
    let res = await axios.get('http://localhost:3000/user?email=' + email);

    let data = res.data;

    if (data.length > 0) {
        flag = true;
    }
    else {
        flag = false;
    }

    return flag;
    
}



async function addUser(userdata) {

    // let payload = { userdata };

    let res = await axios.post('http://localhost:3000/user', userdata);

    let data = res.data;
    console.log(data);
}
