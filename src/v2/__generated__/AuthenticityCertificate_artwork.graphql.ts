/* tslint:disable */

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
  "kind": "Fragment",
  "name": "AuthenticityCertificate_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasCertificateOfAuthenticity",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_biddable",
      "name": "isBiddable",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '39bc344c746b3df84f3c897873593c9b';
export default node;
