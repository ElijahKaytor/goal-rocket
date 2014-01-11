/*! File:       sha-256.js
 *  Author:     Elijah Kaytor
 *  License:    GPLv3
 */

function sha256(message) {
    
    if (message.length > 55) throw('Hash too long');
    
    var M = sha256.encodeMessage(message);
    var W = sha256.generateSchedule(M);
    var H = sha256.hashSchedule(W);
    
    return sha256.hashToHex(H);
    
}

// Message Encoder
sha256.encodeMessage = function(msg) {
    
    msg += String.fromCharCode(0x80);  // add trailing '1' bit (+ 0's padding) to string [§5.1.1]
    
    // convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
    var M = new Array(16);
    
    for (var i=0; i<16; i++)
        M[i] =  ( msg.charCodeAt(i*4)   << 24  )
             |  ( msg.charCodeAt(i*4+1) << 16  )
             |  ( msg.charCodeAt(i*4+2) << 8   )
             |  ( msg.charCodeAt(i*4+3)        );
    
    M[14] = Math.floor(((msg.length - 1) * 8) / 0x100000000);
    M[15] = ((msg.length - 1) * 8) & 0xffffffff;
    
    return M;
    
};

sha256.generateSchedule = function(M) {
    
    var W = M.slice(0, 16);
    
    for (var i=16; i<64; i++)
        W[i] = (   sha256.sigma1(W[i-2])
                 + sha256.sigma0(W[i-15])
                 + W[i-7] + W[i-16]
               ) & 0xffffffff;
    
    return W;
    
};

sha256.hashToHex = function(H) {
    
    return H.map(function(h) {
        return Array.apply(null, Array(8)).map(function(_, i) {
            return ((h >>> ((7 - i) * 4)) & 0xf).toString(16);
        }).join('');
    }).join('');
    
};

sha256.hashSchedule = function(W) {
    
    // Initial Hash values
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
             0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    
    // Worker Variables
    var a = H[0];   var b = H[1];
    var c = H[2];   var d = H[3];
    var e = H[4];   var f = H[5];
    var g = H[6];   var h = H[7];
    
    for (var i=0; i<64; i++) {
        
        var T1 = sha256.Sigma1(e)
               + sha256.Ch(e, f, g)
               + sha256.K[i]
               + W[i] + h;
        
        var T2 = sha256.Sigma0(a)
               + sha256.Maj(a, b, c);
        
        h = g;    g = f;    f = e;
        e = (d + T1) & 0xffffffff;
        d = c;    c = b;    b = a;
        a = (T1 + T2) & 0xffffffff;
        
    }
    
    H[0] = (H[0]+a) & 0xffffffff;
    H[1] = (H[1]+b) & 0xffffffff;
    H[2] = (H[2]+c) & 0xffffffff;
    H[3] = (H[3]+d) & 0xffffffff;
    H[4] = (H[4]+e) & 0xffffffff;
    H[5] = (H[5]+f) & 0xffffffff;
    H[6] = (H[6]+g) & 0xffffffff;
    H[7] = (H[7]+h) & 0xffffffff;
    
    return H;
    
};

// Bitwise Functions
sha256.ROTR = function(n, x) { return (x >>> n) | (x << (32-n)); };
sha256.sigma0 = function(x) { return sha256.ROTR(7,  x) ^ sha256.ROTR(18, x) ^ (x>>>3);  };
sha256.sigma1 = function(x) { return sha256.ROTR(17, x) ^ sha256.ROTR(19, x) ^ (x>>>10); };
sha256.Sigma0 = function(x) { return sha256.ROTR(2,  x) ^ sha256.ROTR(13, x) ^ sha256.ROTR(22, x); };
sha256.Sigma1 = function(x) { return sha256.ROTR(6,  x) ^ sha256.ROTR(11, x) ^ sha256.ROTR(25, x); };
sha256.Ch = function(x, y, z)  { return (x & y) ^ (~x & z); };
sha256.Maj = function(x, y, z) { return (x & y) ^ (x & z) ^ (y & z); };

// Constants
sha256.K =  [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
             0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
             0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
             0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
             0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
             0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
             0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
             0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
             0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
             0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
             0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
             0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
             0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
             0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
             0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
             0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
