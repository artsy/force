/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuthenticityCertificate_artwork = {
    readonly hasCertificateOfAuthenticity: boolean | null;
    readonly is_biddable: boolean | null;
    readonly " $refType": "AuthenticityCertificate_artwork";
};
export type AuthenticityCertificate_artwork$data = AuthenticityCertificate_artwork;
export type AuthenticityCertificate_artwork$key = {
    readonly " $data"?: AuthenticityCertificate_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"AuthenticityCertificate_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuthenticityCertificate_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasCertificateOfAuthenticity",
      "storageKey": null
    },
    {
      "alias": "is_biddable",
      "args": null,
      "kind": "ScalarField",
      "name": "isBiddable",
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '39bc344c746b3df84f3c897873593c9b';
export default node;
