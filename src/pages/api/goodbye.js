// pages/api/goodbye.js
import { VerifiableCredential } from '@web5/credentials';
import { DidDht } from '@web5/dids';

export default async function handler(req, res) {
    const issuerDid = await DidDht.create();
    const subjectDid = await DidDht.create();

    const vc = await VerifiableCredential.create({
        type: 'DateOfBirthCredential',
        issuer: issuerDid.uri,
        subject: subjectDid.uri,
        expirationDate: '2024-09-30T12:34:56Z',
        data: {
            "dateOfBirth": "1990-01-01"
        }
    });

    // console.log(vc)

    const vcJwt = await vc.sign({ did: issuerDid });
    console.log(vcJwt)

    // Assuming DidDht.create() returns the DID information you want to share.
    // Adjust the response to include issuerDid and subjectDid.
    res.status(200).json({
        message: 'Goodbye from API 2!',
        issuerDid: issuerDid.uri, // Make sure to convert to string if it's an object
        subjectDid: subjectDid.uri,
        vcJwt: vcJwt
    });
}
