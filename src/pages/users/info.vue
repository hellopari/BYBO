<template>
  <div id="userInfo">
    <v-divider class="my-2"></v-divider>
    <!-- 基本資訊 -->
    <div class="title px-4 py-3 ">
     {{$t('user.title.essential_information' )}}

      <v-btn small color="primary" style="float:right" @click="dialog = true">
        {{$t('user.title.edit_baseinfo')}}
      </v-btn>
    </div>
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else>
      <!-- 有數據 -->
      <div class="my-5 text-xs-center" v-if="!isProfile">
        <v-icon color="primary" size="100">assignment_ind</v-icon>
        <p class="my-5 py-2">{{$t('user.user_baseinfo.no_user_baseinfo')}}</p>
      </div>
      <!-- 無數據 -->
      <v-card v-else>
        <v-layout row wrap class="my-3 px-4 grey py-4 lighten-5">
          <v-flex md3 class="pb-3">
            <span class="mr-2">{{$t('user.user_baseinfo.name')}}:</span>
            {{profile.name}}
          </v-flex>
          <v-flex md3 class="pb-3" v-if="profile.englishName !== null">
            <span class="gray mr-2">{{$t('global.EnglishName')}}:</span>
            {{profile.englishName}}
          </v-flex>
          <v-flex md3 class="pb-3">
            <span class="gray mr-2">{{$t('user.user_baseinfo.genders')}}:</span>
            <span v-if="profile.gender === 'F'" class="item-text">{{$t('global.F') }}</span>
            <span v-if="profile.gender === 'M'" class="item-text">{{$t('global.M')}}</span>
          </v-flex>
          <v-flex md3 class="pb-3">
            <span class="gray mr-2">{{$t('user.user_baseinfo.age')}}:</span>
            {{profile.age}}
          </v-flex>
          <v-flex md3 class="pb-3">
            <span class="gray mr-2">{{$t('user.user_baseinfo.location')}}:</span>
            {{$t(`global.${profile.country.id}`)}}
          </v-flex>
          <v-flex md3 class="pb-3">
            <span class="gray mr-2">{{$t('user.user_baseinfo.phone')}}:</span>
            {{profile.phone}}
          </v-flex>
          <v-flex md3 class="pb-3">
            <span class="gray mr-2">{{$t('user.user_baseinfo.email')}}:</span>
            {{profile.email}}
          </v-flex>
          <v-flex md3 class="pb-3">
            <span class="gray mr-2">{{$t('user.user_baseinfo.card_types')}}:</span>
            {{$t(`global.${profile.idtype}`)}}
          </v-flex>
          <v-flex md3 class="pb-3">
            <span class="gray mr-2">{{$t('user.user_baseinfo.card_number')}}:</span>
            {{profile.idnumber}}
          </v-flex>
        </v-layout>

      </v-card>
    </div>
    <!-- 添加基本資訊模態框 -->
    <v-layout row justify-center>
      <v-dialog v-model="dialog"  max-width="700px">
        <v-card>
          <v-card-title>
            <span class="title"> {{$t('user.title.edit_baseinfo')}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="form" v-model="vaild">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field color="purple darken-2" v-model="profile.name"
                                  :label="$t('user.user_baseinfo.input_name')" :rules="[rules.required]"
                                  clearable></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field color="purple darken-2" v-model="profile.englishName"
                                  :label="$t('global.EnglishName')" :rules="[rules.required]" clearable></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <div class="grey--text"> {{$t('user.user_baseinfo.genders')}}</div>
                    <v-radio-group v-model="profile.gender" row>
                      <v-radio color="primary" :label="$t('global.F')" value="F"></v-radio>
                      <v-radio color="purple darken-2" :label="$t('global.M')" value="M"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12>
                    <v-dialog ref="dialog" v-model="menu" :return-value.sync="profile.age"  lazy full-width
                              width="290px">
                      <v-text-field slot="activator" v-model="profile.age" :label="$t('user.user_baseinfo.age')"
                                    :rules="[rules.required]" readonly></v-text-field>
                      <v-date-picker v-model="profile.age" :max="currentDate" scrollable :locale="i18n">
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">{{$t('button.cancel')}}</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(profile.age)">{{$t('button.confirm')}}
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field color="purple darken-2" v-model="profile.phone"
                                  :label="$t('user.user_baseinfo.phone')" :rules="[rules.required]"
                                  clearable></v-text-field>
                  </v-flex>
                  <v-flex xs12 >
                    <v-text-field color="purple darken-2" v-model="profile.email" disabled
                                  :label="$t('user.user_baseinfo.email')"
                                  :rules="emailRules"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <div class="grey--text">{{$t('user.user_baseinfo.card_types')}}</div>
                    <v-radio-group v-model="profile.idtype" row>
                      <v-radio :label="$t('global.ID')" color="primary" value="ID"></v-radio>
                      <v-radio :label="$t('global.PASS')" color="purple darken-2" value="PASS"></v-radio>
                      <v-radio :label="$t('global.PASSPORT')" color="red" value="PASSPORT"></v-radio>
                      <v-radio :label="$t('global.DRIVER')" color="indigo darken-3" value="DRIVER"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field color="purple darken-2" v-model="profile.idnumber"
                                  :label="$t('user.user_baseinfo.card_number')" :rules="[rules.required]"
                                  clearable></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" flat @click.native="dialog = false">{{$t('button.cancel')}}</v-btn>
            <v-btn color="primary darken-1" :disabled="!vaild" :loading="isLoading" flat @click.native="onSubmit()">
              {{$t('button.save')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <!-- 我的公司 -->
    <div class="title px-4 py-3">
      {{$t('user.title.my_company' )}}
      <v-btn small color="primary" style="float:right" @click="opendDialog(2,'add')">
        {{$t('user.title.add_myCompany')}}
      </v-btn>
    </div>
    <v-data-table :headers="headers" :items="desserts" :no-data-text="$t('message.no_message')"
                  :pagination.sync="pagination" :rows-per-page-items="limit" :total-items="totalDesserts"
                  :loading="loading1" class="rtable rtable--flip elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.companyName }}</td>
        <td class="text-xs-left">{{ props.item.userCompanyCategory.name}}</td>
        <td class="text-xs-left">{{ props.item.mobile }}</td>
        <td class="text-xs-left">{{ props.item.companyEmail}}</td>
        <td class="text-xs-left">
          <a @click="props.expanded = !props.expanded">{{$t('chamber.btn.see')}}</a>
        </td>
        <td class="text-md-center text-xs-left">
          <v-tooltip top>
            <v-btn flat icon color="primary" slot="activator" @click="opendDialog(2,props.item)">
              <v-icon size="18">edit</v-icon>
            </v-btn>
            <span>{{$t('button.edit')}}</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn flat icon color="error" slot="activator" @click="change(props.item.id,'user/user_companys')">
              <v-icon size="18">close</v-icon>
            </v-btn>
            <span>{{$t('button.delete')}}</span>
          </v-tooltip>
        </td>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>{{$t('user.user_company.address' )}}: {{ props.item.address}}</v-card-text>
          <v-card-text>{{$t('user.user_company.scope_experience')}}: {{ props.item.scopeOfOperation}}</v-card-text>
        </v-card>
      </template>
    </v-data-table>

    <!-- 添加公司模態框 -->
    <v-layout row justify-center>
      <v-dialog v-model="dialog2"  max-width="700px">
        <v-card>
          <v-card-title>
            <span class="title"> {{$t('user.title.my_company')}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="form" v-model="vaild">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex md9>
                        <v-text-field color="purple darken-2" v-model="item.companyName"
                                      :label="$t('user.user_company.company_name')" :rules="[rules.required]"
                                      clearable></v-text-field>
                      </v-flex>
                      <v-flex md3>
                        <v-checkbox color="purple darken-2" :label="$t('global.set_company_account')"
                                    v-model="item.isActive"></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <v-autocomplete v-model="item['userCompanyCategory.id']" :no-data-text="$t('message.no_message')"
                                    :items="companyCategory" :rules="[rules.required]" color="purple darken-2"
                                    :label="$t('chamber.select.industry')" item-text="name" item-value="id">
                      <template slot="item" slot-scope="data">
                        <template>
                          <v-list-tile-content>
                            <v-list-tile-title color="#333" v-html="data.item.name"></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field color="purple darken-2" v-model="item.companyEmail"
                                  :label="$t('user.user_company.company_email')" :rules="[rules.required,rules.email]"
                                  clearable></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field color="purple darken-2" v-model="item.mobile" :label="$t('user.user_company.tel')"
                                  :rules="[rules.required]" clearable></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field color="purple darken-2" v-model="item.address"
                                  :label="$t('user.user_company.address')" :rules="[rules.required]"
                                  clearable></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea color="purple darken-2" v-model="item.scopeOfOperation"
                                :label="$t('user.user_company.scope_experience')" :rules="[rules.required]"
                                clearable></v-textarea>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" flat @click.native="dialog2 = false">{{$t('button.cancel')}}</v-btn>
            <v-btn color="primary darken-1" :disabled="!vaild" :loading="isLoading" flat @click.native="onSubmit1()">
              {{$t('button.save')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <!-- 工作經驗 -->
    <div class="title px-4 py-3 ml-2">
      {{$t('user.title.hands_on_background' )}}
      <v-btn small color="primary" style="float:right" @click="opendDialog(3,'add')">
        {{$t('user.title.add_experience')}}
      </v-btn>
    </div>
    <v-data-table :headers="headers2" :items="desserts2" :no-data-text="$t('message.no_message')"
                  :pagination.sync="pagination" :rows-per-page-items="limit" :total-items="totalDesserts2"
                  :loading="loading2" class="rtable rtable--flip elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.startedDate | time }} - {{ props.item.endedDate | time }}</td>
        <td class="text-xs-left">{{ props.item.companyName}}</td>
        <td class="text-xs-left">{{ props.item.position }}</td>
        <td class="text-xs-left">
          <a @click="props.expanded = !props.expanded">{{$t('chamber.btn.see')}}</a>
        </td>
        <td class="text-md-center text-xs-left">
          <v-tooltip top>
            <v-btn flat icon color="primary" slot="activator" @click="opendDialog(3,props.item)">
              <v-icon size="18">edit</v-icon>
            </v-btn>
            <span>{{$t('button.edit')}}</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn flat icon color="error" slot="activator" @click="change(props.item.id,'user/user_experiences')">
              <v-icon size="18">close</v-icon>
            </v-btn>
            <span>{{$t('button.delete')}}</span>
          </v-tooltip>
        </td>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>{{$t('user.user_experience.job_description')}}: {{ props.item.description}}</v-card-text>
        </v-card>
      </template>
    </v-data-table>

    <!-- 添加工作模態框 -->
    <v-layout row justify-center>
      <v-dialog v-model="dialog3" max-width="700px">
        <v-card>
          <v-card-title>
            <span class="title"> {{$t('user.title.hands_on_background')}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="experienceForm" v-model="experienceVaild">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-dialog ref="starteds" v-model="menu4" :return-value.sync="item.startedDate"  lazy
                              full-width width="290px">
                      <v-text-field slot="activator" v-model="item.startedDate"
                                    :label="$t('user.user_experience.start')" :rules="[rules.required]"
                                    readonly></v-text-field>
                      <v-date-picker v-model="item.startedDate" :max="currentDate" scrollable :locale="i18n">
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu4 = false">{{$t('button.cancel')}}</v-btn>
                        <v-btn flat color="primary" @click="$refs.starteds.save(item.startedDate)">
                          {{$t('button.confirm')}}
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12>
                    <v-dialog ref="endeds" v-model="menu3" :return-value.sync="item.endedDate" lazy
                              full-width width="290px">
                      <v-text-field slot="activator" v-model="item.endedDate" :label="$t('user.user_experience.end')"
                                    :rules="[rules.required]" readonly></v-text-field>
                      <v-date-picker v-model="item.endedDate" :max="currentDate" scrollable :locale="i18n">
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu3 = false">{{$t('button.cancel')}}</v-btn>
                        <v-btn flat color="primary" @click="$refs.endeds.save(item.endedDate)">
                          {{$t('button.confirm')}}
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field color="purple darken-2" v-model="item.companyName"
                                  :label="$t('user.user_experience.company')" :rules="[rules.required]"
                                  clearable></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field color="purple darken-2" v-model="item.position"
                                  :label="$t('user.user_experience.position')" :rules="[rules.required]"
                                  clearable></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-textarea color="purple darken-2" v-model="item.description"
                                :label="$t('user.user_experience.job_description')" :rules="[rules.required]"
                                clearable></v-textarea>
                  </v-flex>

                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" flat @click.native="dialog3 = false">{{$t('button.cancel')}}</v-btn>
            <v-btn color="primary darken-1" :disabled="!experienceVaild" :loading="isLoading" flat
                   @click.native="onSubmit2()">{{$t('button.save')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <!-- 教育背景 -->
    <div class="title px-4 py-3 ml-2">
      {{$t('user.title.educational_background' )}}
      <v-btn small color="primary" style="float:right" @click="opendDialog(4,'add')">
        {{$t('user.title.add_education')}}
      </v-btn>
    </div>
    <v-data-table :headers="headers3" :items="desserts3" :no-data-text="$t('message.no_message')"
                  :pagination.sync="pagination" :rows-per-page-items="limit" :total-items="totalDesserts3"
                  :loading="loading3" class="rtable rtable--flip elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.startDate }} - {{ props.item.endDate }}</td>
        <td class="text-xs-left">{{ props.item.schoolName}}</td>
        <td class="text-xs-left">{{ props.item.subject }}</td>
        <td class="text-xs-left">
          {{$t(`user.user_education.education_level.${props.item.educationLevel}`)}}
        </td>
        <td class="text-md-center text-xs-left">
          <v-tooltip top>
            <v-btn flat icon color="primary" slot="activator" @click="opendDialog(4,props.item)">
              <v-icon size="18">edit</v-icon>
            </v-btn>
            <span>{{$t('button.edit')}}</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn flat icon color="error" slot="activator" @click="change(props.item.id,'user/user_educations')">
              <v-icon size="18">close</v-icon>
            </v-btn>
            <span>{{$t('button.delete')}}</span>
          </v-tooltip>
        </td>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>{{$t('user.user_experience.job_description')}}: {{ props.item.description}}</v-card-text>
        </v-card>
      </template>
    </v-data-table>

    <!-- 添加學歷模態框 -->
    <v-layout row justify-center>
      <v-dialog v-model="dialog4"  max-width="700px">
        <v-card>
          <v-card-title>
            <span class="title"> {{$t('user.title.educational_background')}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="form" v-model="vaild">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-dialog ref="startedDate" v-model="menu1" :return-value.sync="item.startDate"  lazy
                              full-width width="290px">
                      <v-text-field slot="activator" v-model="item.startDate" :label="$t('user.user_experience.start')"
                                    :rules="[rules.required]" readonly></v-text-field>
                      <v-date-picker v-model="item.startDate" :max="currentDate" scrollable :locale="i18n">
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu1 = false">{{$t('button.cancel')}}</v-btn>
                        <v-btn flat color="primary" @click="$refs.startedDate.save(item.startDate)">
                          {{$t('button.confirm')}}
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12>
                    <v-dialog ref="endedDate" v-model="menu2" :return-value.sync="item.endDate"  lazy
                              full-width width="290px">
                      <v-text-field slot="activator" v-model="item.endDate" :label="$t('user.user_experience.end')"
                                    :rules="[rules.required]" readonly></v-text-field>
                      <v-date-picker v-model="item.endDate" :max="currentDate" scrollable :locale="i18n">
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu2 = false">{{$t('button.cancel')}}</v-btn>
                        <v-btn flat color="primary" @click="$refs.endedDate.save(item.endDate)">
                          {{$t('button.confirm')}}
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field color="purple darken-2" v-model="item.schoolName"
                                  :label="$t('user.user_education.school')" :rules="[rules.required]"
                                  clearable></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field color="purple darken-2" v-model="item.subject"
                                  :label="$t('user.user_education.major')" :rules="[rules.required]"
                                  clearable></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <div class="grey--text">{{$t('user.user_education.education_levels')}}</div>
                    <v-radio-group v-model="item.educationLevel" row>
                      <v-radio :label="$t('user.user_education.education_level.MASTER')" color="primary"
                               value="MASTER"></v-radio>
                      <v-radio :label="$t('user.user_education.education_level.POSTGRADUATE')" color="purple darken-2"
                               value="POSTGRADUATE"></v-radio>
                      <v-radio :label="$t('user.user_education.education_level.DEGREE')" color="red"
                               value="DEGREE"></v-radio>
                      <v-radio :label="$t('user.user_education.education_level.COLLEGE')" color="success"
                               value="COLLEGE"></v-radio>
                      <v-radio :label="$t('user.user_education.education_level.DOCTOR')" color="indigo darken-3"
                               value="DOCTOR"></v-radio>
                      <v-radio :label="$t('user.user_education.education_level.SCHOOLCERTIFICATE')"
                               color="orange darken-3" value="SCHOOLCERTIFICATE"></v-radio>
                      <v-radio :label="$t('user.user_education.education_level.ANY')" color="secondary"
                               value="ANY"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea color="purple darken-2" v-model="item.description"
                                :label="$t('user.user_education.job_description')" :rules="[rules.required]"
                                clearable></v-textarea>
                  </v-flex>

                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" flat @click.native="dialog4 = false">{{$t('button.cancel')}}</v-btn>
            <v-btn color="primary darken-1" :disabled="!vaild" :loading="isLoading" flat @click.native="onSubmit3()">
              {{$t('button.save')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <!-- 刪除模態框 -->
    <v-layout row justify-center>
      <v-dialog v-model="dialog1"  max-width="290">
        <v-card>
          <v-card-title class="headline">{{$t('global.deleteConfirmTitle')}}</v-card-title>
          <v-card-text>{{$t('global.deleteConfirmText')}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" flat @click.native="dialog1 = false">{{$t('button.cancel')}}</v-btn>
            <v-btn color="primary darken-1" flat @click="deletes()">{{$t('button.confirm')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

  </div>
</template>
<script>
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        vaild: true,
        experienceVaild: true,
        isLoading: false,
        item: {},
        currentDate: this.$moment(new Date()),
        i18n: localStorage.getItem('i18n') === 'EN' ? 'en-us' : 'zh-cn',
        menu: false,
        menu1: false,
        menu2: false,
        menu3: false,
        menu4: false,
        dialog: false,
        dialog1: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        loading: false,
        loading1: false,
        loading2: false,
        loading3: false,
        isProfile: false,
        deleteUrl: null,
        companyCategory: [],
        profile: {
          'country.id': 99,
          'user.id': this.$route.params.userId
        },
        rules: {
          email: v => (v || '').match(/@/) || this.$t('validation.email'),
          required: v => !!v || this.$t('validation.required'),
        },
        emailRules: [
          v => !!v || this.$t('validation.required'),
          v => /.+@.+/.test(v) || this.$t('validation.email')
        ],
        pagination: {
          sortBy: 'createdAt',
          page: 0
        },
        totalDesserts: 0,
        totalDesserts2: 0,
        totalDesserts3: 0,
        limit: [4],
        desserts: [],
        desserts2: [],
        desserts3: [],
        headers: [
          {
            text: this.$t('user.user_company.company_name'),
            align: 'left',
            sortable: false,
            value: 'title'
          },
          {
            text: this.$t('user.home.industry'),
            value: 'coc',
            sortable: false
          },
          {
            text: this.$t('user.user_company.tel'),
            value: 'coc',
            sortable: false
          },
          {
            text: this.$t('chamber.member.email'),
            value: 'email',
            sortable: false
          },
          {
            text: this.$t('user.user_education.job_description'),
            value: 'lastModifiedAt',
            sortable: false
          },
          {
            text: this.$t('chamber.know.operation'),
            value: 'operation',
            sortable: false
          }
        ],
        headers2: [
          {
            text: this.$t('chamber.know.time'),
            align: 'left',
            sortable: false,
            value: 'title'
          },
          {
            text: this.$t('user.user_company.company_name'),
            value: 'coc',
            sortable: false
          },
          {
            text: this.$t('user.user_experience.position'),
            value: 'coc',
            sortable: false
          },
          {
            text: this.$t('user.user_experience.job_description'),
            value: 'coc',
            sortable: false
          },
          {
            text: this.$t('chamber.know.operation'),
            value: 'operation',
            sortable: false
          }
        ],
        headers3: [
          {
            text: this.$t('chamber.know.time'),
            align: 'left',
            sortable: false,
            value: 'title'
          },
          {
            text: this.$t('user.user_education.school'),
            value: 'coc',
            sortable: false
          },
          {
            text: this.$t('user.user_education.major'),
            value: 'coc',
            sortable: false
          },
          {
            text: this.$t('user.user_education.education_levels'),
            value: 'coc',
            sortable: false
          },
          {
            text: this.$t('chamber.know.operation'),
            value: 'operation',
            sortable: false
          }
        ]
      }
    },
    mounted() {
      this.readProfile()
      this.reloadTable()
      this.reloadTable2()
      this.reloadTable3()
    },
    methods: {
      ...mapMutations(['snackbarStateChange']),
      // 获取用户信息
      async readProfile() {
        this.loading = true
        await this.$http
          .get(`user/user/${this.$route.params.userId}/profiles`, {
            params: {userId: this.$route.params.userId}
          })
          .then(res => {

            if (res.data.content.length > 0) {
              this.profile = res.data.content[0]
              this.isProfile = true
            } else {
              this.$http
                .get(`user/users/${this.$route.params.userId}`)
                .then(res => {
                  this.profile.email = res.data.email
                })
              this.isProfile = false
            }
            this.loading = false
          })
      },
      //用户信息
      onSubmit() {
        this.isloading = true
        this.isLoading = true
        let method
        if (this.profile.id) {
          delete this.profile.country
          delete this.profile.user
          delete this.profile.createdAt
          delete this.profile.updatedAt
          delete this.profile.lastModifiedAt
          delete this.profile.description
          delete this.profile.remark
          this.profile['country.id'] = 99
          this.profile['user.id'] = sessionStorage.getItem('userId')
           
          method = 'put'
        } else {
          method = 'post'
        }
        this.$http[method](
          `user/user/${this.$route.params.userId}/profiles`,
          this.$serialize(this.profile),
         
        )
          .then(res => {
            this.snackbarStateChange({
              color: 'success',
              text: this.$t(`message.update_message`),
              snackbar: true
            })
            this.readProfile()
            this.dialog = false
            this.loading = false
            this.isLoading = false
          })
          .catch(error => {
            
            this.loading = false
            this.isLoading = false
            this.snackbarStateChange({
              color: 'error',
              text: error.data.message,
              snackbar: true
            })
          })
      },
      //獲取公司
      reloadTable() {
        this.loading1 = true
        this.$http
          .get(`user/user_companys`, {
            params: {'user.id': this.$route.params.userId}
          })
          .then(res => {
            this.desserts = res.data.content
            this.totalDesserts = res.data.totalElements
            this.loading1 = false
          })
      },
      //活動公司分類
      readCompanyCategory() {
        this.$http.get(`public/user_company_categorys`).then(res => {
          this.companyCategory = res.data.content
        })
      },
      //添加修改公司
      onSubmit1() {
        this.isLoading = true
        let method
        if (this.item.id) {
          delete this.item.deletedAt
          delete this.item.createdAt
          delete this.item.updatedAt
          delete this.item.lastModifiedAt
          delete this.item.userCompanyCategory
          method = 'put'
        } else {
          method = 'post'
        }
        this.item['user.id'] = this.$route.params.userId
        this.$http[method](`user/user_companys`, this.$serialize(this.item))
          .then(res => {
            this.snackbarStateChange({
              color: 'success',
              text: this.$t(`message.update_message`),
              snackbar: true
            })
            this.reloadTable()
            this.dialog2 = false
            this.item = {}
            this.isLoading = false
          })
          .catch(error => {
            this.isLoading = false
            this.snackbarStateChange({
              color: 'error',
              text: error.data.message,
              snackbar: true
            })
          })
      },
      //獲取工作
      reloadTable2() {
        this.loading2 = true
        this.$http
          .get(`user/user_experiences`, {
            params: {'user.id': this.$route.params.userId}
          })
          .then(res => {
            this.desserts2 = res.data.content
            this.totalDesserts2 = res.data.totalElements
            this.loading2 = false
          })
      },
      //添加修改工作
      onSubmit2() {
        this.isLoading = true
        let method
        if (this.item.id) {
          delete this.item.deletedAt
          delete this.item.updatedAt
          delete this.item.createdAt
          delete this.item.lastModifiedAt
          delete this.item.title
          delete this.item.remark
          method = 'put'
        } else {
          method = 'post'
        }
        this.item['user.id'] = this.$route.params.userId
        this.$http[method](`user/user_experiences`, this.$serialize(this.item)).then(res => {
          this.snackbarStateChange({
            color: 'success',
            text: this.$t(`message.update_message`),
            snackbar: true
          })
          this.reloadTable2()
          this.dialog3 = false
          this.item = {}
          this.isLoading = false
        })
          .catch(error => {
            this.isLoading = false
            this.snackbarStateChange({
              color: 'error',
              text: error.data.message,
              snackbar: true
            })
          })
      },
      //獲取學歷
      reloadTable3() {
        this.loading3 = true
        this.$http
          .get(`user/user_educations`, {
            params: {'user.id': this.$route.params.userId}
          })
          .then(res => {
            this.desserts3 = res.data.content
            this.totalDesserts3 = res.data.totalElements
            this.loading3 = false
          })
      },
      //添加學歷工作
      onSubmit3() {
        this.isLoading = true
        let method
        if (this.item.id) {
          delete this.item.updatedAt
          delete this.item.createdAt
          delete this.item.lastModifiedAt
          delete this.item.remark
          method = 'put'
        } else {
          method = 'post'
        }
        this.item['user.id'] = this.$route.params.userId
        this.$http[method](`user/user_educations`, this.$serialize(this.item))
          .then(res => {
            this.snackbarStateChange({
              color: 'success',
              text: this.$t(`message.update_message`),
              snackbar: true
            })
            this.reloadTable3()
            this.dialog4 = false
            this.item = {}
            this.isLoading = false
          })
          .catch(error => {
            this.isLoading = false
            this.snackbarStateChange({
              color: 'error',
              text: error.data.message,
              snackbar: true
            })
          })
      },
      // 刪除
      deletes() {
        this.$http
          .delete(`${this.deleteUrl}/${this.itemId}`)
          .then(res => {
            this.snackbarStateChange({
              color: 'success',
              text: this.$t('message.delete_success'),
              snackbar: true
            })
            this.dialog1 = false
            switch (this.deleteUrl) {
              case 'user/user_companys':
                this.reloadTable()
                break
              case 'user/user_experiences':
                this.reloadTable2()
                break
              case 'user/user_educations':
                this.reloadTable3()
                break
            }
          })
          .catch(error => {
            this.snackbarStateChange({
              color: 'error',
              text: error.data.message,
              snackbar: true
            })
          })
      },
      change(id, url) {
        this.dialog1 = true
        this.itemId = id
        this.deleteUrl = url
      },
      opendDialog(i, data) {
        this[`dialog${i}`] = true
        if (i === 2) {
          if (this.companyCategory.length === 0)
            this.readCompanyCategory()
        }
        if (data !== 'add') {
          this.item = data
          if (i === 2) {
            this.item['userCompanyCategory.id'] =
              data.userCompanyCategory.id
          }
        } else {
          this.item = {}
        }
      }
    }
  }
</script>

