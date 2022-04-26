/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuthenticityCertificate_artwork = {
    readonly hasCertificateOfAuthenticity: boolean | null;
    readonly isBiddable: boolean | null;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isBiddable",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '68976fde8abfd8a937ab302662fb539b';
export default node;
