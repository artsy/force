/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerInfo_fairOrganizer = {
    readonly about: string | null;
    readonly " $refType": "FairOrganizerInfo_fairOrganizer";
};
export type FairOrganizerInfo_fairOrganizer$data = FairOrganizerInfo_fairOrganizer;
export type FairOrganizerInfo_fairOrganizer$key = {
    readonly " $data"?: FairOrganizerInfo_fairOrganizer$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerInfo_fairOrganizer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerInfo_fairOrganizer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "about",
      "storageKey": "about(format:\"HTML\")"
    }
  ],
  "type": "FairOrganizer"
};
(node as any).hash = '8c1500080b2355919c6d76e295bc97e7';
export default node;
