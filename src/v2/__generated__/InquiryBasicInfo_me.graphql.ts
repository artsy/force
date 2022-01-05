/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InquiryBasicInfo_me = {
    readonly location: {
        readonly display: string | null;
    } | null;
    readonly phone: string | null;
    readonly profession: string | null;
    readonly " $refType": "InquiryBasicInfo_me";
};
export type InquiryBasicInfo_me$data = InquiryBasicInfo_me;
export type InquiryBasicInfo_me$key = {
    readonly " $data"?: InquiryBasicInfo_me$data;
    readonly " $fragmentRefs": FragmentRefs<"InquiryBasicInfo_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InquiryBasicInfo_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MyLocation",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "display",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phone",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profession",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'a81073b62e4c18fa1ed1176610967ac9';
export default node;
