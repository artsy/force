/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsAdditionalInfo_artwork = {
    readonly category: string | null;
    readonly series: string | null;
    readonly publisher: string | null;
    readonly manufacturer: string | null;
    readonly image_rights: string | null;
    readonly canRequestLotConditionsReport: boolean | null;
    readonly internalID: string;
    readonly framed: {
        readonly label: string | null;
        readonly details: string | null;
    } | null;
    readonly signatureInfo: {
        readonly label: string | null;
        readonly details: string | null;
    } | null;
    readonly conditionDescription: {
        readonly label: string | null;
        readonly details: string | null;
    } | null;
    readonly certificateOfAuthenticity: {
        readonly label: string | null;
        readonly details: string | null;
    } | null;
    readonly " $refType": "ArtworkDetailsAdditionalInfo_artwork";
};
export type ArtworkDetailsAdditionalInfo_artwork$data = ArtworkDetailsAdditionalInfo_artwork;
export type ArtworkDetailsAdditionalInfo_artwork$key = {
    readonly " $data"?: ArtworkDetailsAdditionalInfo_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkDetailsAdditionalInfo_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "label",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "details",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "ArtworkDetailsAdditionalInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "category",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "series",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "publisher",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "manufacturer",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "image_rights",
      "name": "imageRights",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "canRequestLotConditionsReport",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "framed",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "plural": false,
      "selections": (v0/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "signatureInfo",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "plural": false,
      "selections": (v0/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "conditionDescription",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "plural": false,
      "selections": (v0/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "certificateOfAuthenticity",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "plural": false,
      "selections": (v0/*: any*/)
    }
  ]
};
})();
(node as any).hash = '866bbb3484e7b8b12947081a9d28eb6a';
export default node;
