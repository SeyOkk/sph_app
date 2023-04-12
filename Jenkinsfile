pipeline {
    //代理，通常是一个机器或容器
    agent any

    environment {
        CI = 'true'
        JENKINS_HOME = '/root/.jenkins/workspace'
        APP_NAME = 'sph_app'
    }

    parameters {
        string (name: 'BRANCH', defaultValue: 'master', description: 'build gitlab branch')
        string (name: 'version', defaultValue: '0.0.0', description: 'build version')
    }

    stages {
        //构建阶段
        stage('Build') {
            steps {
                sh  '''
                    npm install && npm run build
                    tar -cvf dist_${APP_NAME}.tar.gz ./dist
                    '''
            }
        }

        //发布阶段
        stage('Deliver') {
            steps {
                script {
                    def remote = [:]
                    remote.name = 'root'
                    remote.host = '8.131.86.202'
                    remote.port = 22
                    remote.allowAnyHosts = true
                    //通过withCredentials调用Jenkins凭据中已保存的凭据，credentialsId需要填写，其他保持默认即可
                    withCredentials([usernamePassword(credentialsId: '062c55c6-f89a-4675-a01a-9c1fe7e20eb1', passwordVariable: 'password', usernameVariable: 'userName')]) {
                        remote.user = "${userName}"
                        remote.password = "${password}"
                    }
                    sshRemove remote: remote, path: '/opt/docker/nginx/html/${APP_NAME}'
                    sshPut remote: remote, from: "${JENKINS_HOME}/${APP_NAME}_pipeline_${params.BRANCH}/dist_${APP_NAME}.tar.gz", into: '/opt/docker/nginx/html/'
                    sshCommand remote: remote, command: "cd /opt/docker/nginx/html/ && tar -xvf ./dist_${APP_NAME}.tar.gz && mv dist ${APP_NAME}"
                }
            }
        }
    }
}
